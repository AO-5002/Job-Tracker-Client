import { useAuth0 } from "@auth0/auth0-react";
import { queryOptions } from "@tanstack/react-query";
import type { Application } from "../schema/Application";
import { useJobFilterStore } from "../stores/ApplicationStore";
import { getApplications } from "../api/ApplicationAPI";

export default function loadTransactionQueryOptions() {
  const { statusFilter, sortBy, order } = useJobFilterStore();
  const { getAccessTokenSilently } = useAuth0();

  return queryOptions({
    queryKey: ["applications", { sortBy, order, statusFilter }],
    queryFn: async (): Promise<Application[]> => {
      const accessToken = await getAccessTokenSilently();
      return getApplications(accessToken, sortBy, order, statusFilter);
    },
  });
}
