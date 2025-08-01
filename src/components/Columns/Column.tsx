import { type Application } from "@/utility/schema/Application";
import ApplicationList from "./ApplicationList";

interface DataProps {
  name: string;
  id: number;
}

export default function Column({ name }: DataProps) {
  return (
    <div
      className={`bg-zinc-800 text-white h-full p-4 shadow-lg rounded-lg flex flex-col items-center gap-4`}
    >
      <h1 className="text-lg font-light border-b self-start w-full">{name}</h1>
      <ApplicationList status={name} />
    </div>
  );
}
