import DashboardLayout from "@/layouts/DashboardLayout";
import Columns from "@/components/Columns/Columns";

export default function Tracker() {
  return (
    <DashboardLayout>
      <div className="h-full w-full grid grid-cols-3 gap-4 grid-rows-[100px_1fr] rounded-xl">
        <div className="bg-muted/80  rounded-xl row-start-1 col-span-3" />
        <Columns />
      </div>
    </DashboardLayout>
  );
}
