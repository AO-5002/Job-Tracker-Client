import ApplicationItem from "./ApplicationItem";
import { useQuery } from "@tanstack/react-query";
import loadTransactionQueryOptions from "@/utility/queryOptions/loadApplicationsQueryOption";
import { type Application } from "@/utility/schema/Application";

interface ApplicationStatusType {
  status: string;
}

export default function ApplicationList({ status }: ApplicationStatusType) {
  const { data } = useQuery(loadTransactionQueryOptions());
  const applications: Application[] =
    data?.filter((app) => app.status === status) || [];

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      {applications.map((item) => {
        return <ApplicationItem key={item.id} {...item} />;
      })}
    </div>
  );
}
