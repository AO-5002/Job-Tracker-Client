import axios from "axios";
import type { SortField, SortOrder } from "../stores/ApplicationStore";
import {
  updateApplicationSchema,
  type ApplicationUpdate,
  type Status,
} from "../schema/Application";
import { toast } from "sonner";

async function getApplications(
  token: string,
  sortBy: SortField[] | undefined,
  order: SortOrder | undefined,
  statusFilter: Status | null
) {
  try {
    const response = await axios.get("http://localhost:8080/applications", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        sortBy,
        order,
        statusFilter,
      },
    });

    return response.data;
  } catch (e) {
    toast("Error fetching application! Please try again later!");
  }
}

async function updateApplication(
  token: string,
  id?: string,
  updateItem?: ApplicationUpdate
) {
  try {
    const resolvedToken = await token;
    const validUpdate = updateApplicationSchema.safeParse(updateItem);

    if (validUpdate.success) {
      await axios.patch(
        `http://localhost:8080/applications/${id}`,
        validUpdate.data,
        {
          headers: {
            Authorization: `Bearer ${resolvedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (e) {
    toast("Failed to update application.");
  }
}

export { getApplications, updateApplication };
