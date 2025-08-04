import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Application } from "@/utility/schema/Application";

interface ChildrenProps {
  children: React.ReactNode;
  data: Application;
}

export function EditApplication({ children, data }: ChildrenProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">{children}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
            <DialogDescription>
              Make changes to your application here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="job_title">Job Title</Label>
              <Input id="job_title" defaultValue={data.job_title} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="company_name">Company Name</Label>
              <Input id="job_title" defaultValue={data.company_name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="job_post_url">Job Post URL</Label>
              <Input id="job_post_url" defaultValue={data.job_post_url} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={data.location} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="resume_url">Resume File</Label>
              <Input id="resume_url" type="file" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cover_letter_url">Cover Letter File</Label>
              <Input id="cover_letter_url" type="file" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
