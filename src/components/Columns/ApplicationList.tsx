import ApplicationItem from "./ApplicationItem";
import { useQuery } from "@tanstack/react-query";
import loadTransactionQueryOptions from "@/utility/queryOptions/loadApplicationsQueryOption";
import { type Application } from "@/utility/schema/Application";
import { useEffect, type Dispatch, type SetStateAction } from "react";

interface ApplicationStatusType {
  status: string;
  setDataCount: Dispatch<SetStateAction<number>>;
}

export default function ApplicationList({
  status,
  setDataCount,
}: ApplicationStatusType) {
  const { data } = useQuery(loadTransactionQueryOptions());

  const applications: Application[] =
    data?.filter((app) => app.status === status) || [];

  useEffect(() => {
    setDataCount(() => applications.length);
  }, [applications]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      {applications.map((item) => {
        return <ApplicationItem key={item.id} {...item} />;
      })}
    </div>
  );
}
