import { Plus } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createApplication } from "@/utility/api/ApplicationAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ApplicationCreate,
  createApplicationSchema,
  type StatusEnumType,
} from "@/utility/schema/Application";

interface StatusApplication {
  status: StatusEnumType;
}

export default function AddApplication({ status }: StatusApplication) {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createApplicationSchema),
  });

  const { mutate: addApplication } = useMutation({
    mutationFn: async (newItem: ApplicationCreate) => {
      const token = await getAccessTokenSilently();
      await createApplication(token, newItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      reset();
    },
  });

  const handleCreate = (data: ApplicationCreate) => {
    const addedStatusData: ApplicationCreate = {
      ...data,
      status: status as StatusEnumType,
    };
    console.log("Form submitted successfully with data:", addedStatusData);

    addApplication(addedStatusData);
  };

  useEffect(() => {
    register("resume_url");
    register("cover_letter_url");
  }, [register]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus height={4} width={4} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add an application</SheetTitle>
          <SheetDescription>
            Fill in the details of your application. This can always be edited
            later!
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleCreate, (errors) =>
            console.log("Form validation errors:", errors)
          )}
          className="h-full w-full flex flex-col justify-between"
        >
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="job_title">
                Job Title <span className="text-red-400">*</span>
              </Label>
              <Input id="job_title" {...register("job_title")} />
              {errors.job_title && (
                <span className="text-red-400">{errors.job_title.message}</span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="company_name">
                Company Name <span className="text-red-400">*</span>
              </Label>
              <Input id="company_name" {...register("company_name")} />
              {errors.company_name && (
                <span className="text-red-400">
                  {errors.company_name.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="job_post_url">
                Job Post URL <span className="text-red-400">*</span>
              </Label>
              <Input id="job_post_url" {...register("job_post_url")} />
              {errors.job_post_url && (
                <span className="text-red-400">
                  {errors.job_post_url.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} />
              {errors.location && (
                <span className="text-red-400">{errors.location.message}</span>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="resume_url">Resume Upload</Label>
              <Input
                id="resume_url"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("resume_url", file, { shouldValidate: true });
                  }
                }}
              />
              {errors.resume_url && (
                <span className="text-red-400">
                  {errors.resume_url.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cover_letter_url">Cover Letter Upload</Label>
              <Input
                id="cover_letter_url"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("cover_letter_url", file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              {errors.cover_letter_url && (
                <span className="text-red-400">
                  {errors.cover_letter_url.message}
                </span>
              )}
            </div>
          </div>
          <SheetFooter className="">
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
