import ColumnLayout from "@/layouts/ColumnLayout";
import Column from "./Column";

export default function Columns() {
  const columnData = [
    {
      id: 1,
      name: "SAVED",
    },
    {
      id: 2,
      name: "APPLIED",
    },
    {
      id: 3,
      name: "INTERVIEW",
    },
    {
      id: 4,
      name: "OFFER",
    },
    {
      id: 5,
      name: "REJECTED",
    },
  ];

  return (
    <ColumnLayout classname="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {columnData.map((item) => {
        return <Column key={item.id} {...item} />;
      })}
    </ColumnLayout>
  );
}
