import axios from "axios";
import type { SortField, SortOrder } from "../stores/ApplicationStore";
import {
  createApplicationSchema,
  updateApplicationSchema,
  type ApplicationCreate,
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

async function createApplication(token: string, newItem: ApplicationCreate) {
  try {
    const resolvedToken = await token;
    // Use createApplicationSchema instead of ApplicationSchema
    const validItem = createApplicationSchema.safeParse(newItem);

    if (validItem.success) {
      const formData = new FormData();

      // Add text fields
      formData.append("job_title", validItem.data.job_title);
      formData.append("company_name", validItem.data.company_name);
      if (validItem.data.location) {
        formData.append("location", validItem.data.location);
      }
      formData.append("status", validItem.data.status || "SAVED"); // Handle optional status
      formData.append("job_post_url", validItem.data.job_post_url);

      // Add files if they exist
      if (validItem.data.resume_url) {
        formData.append("resume_file", validItem.data.resume_url);
      }
      if (validItem.data.cover_letter_url) {
        formData.append("cover_letter_file", validItem.data.cover_letter_url);
      }

      console.log("Sending FormData..."); // Debug log

      await axios.post("http://localhost:8080/applications", formData, {
        headers: {
          Authorization: `Bearer ${resolvedToken}`,
        },
      });

      toast("Application was successfully created!");
    } else {
      console.error("Validation failed:", validItem.error);
      toast("Validation failed!");
    }
  } catch (e) {
    console.error("API Error:", e);
    toast("Failed to create new application!");
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

export { getApplications, updateApplication, createApplication };
