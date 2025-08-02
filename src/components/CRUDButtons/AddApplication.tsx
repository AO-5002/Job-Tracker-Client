import { Plus } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createApplication } from "@/utility/api/ApplicationAPI";
import type { Application } from "@/utility/schema/Application";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function AddApplication() {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const { mutate: addApplication } = useMutation({
    mutationFn: async (newItem: Application) => {
      const token = await getAccessTokenSilently();
      await createApplication(token, newItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const handleCreate = () => {};

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
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Job Title *</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Company Name *</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Job Post URL *</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Location</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Resume Upload</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Cover Letter Upload</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
