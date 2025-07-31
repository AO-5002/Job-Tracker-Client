import { create } from "zustand";
import type { Status } from "../schema/Application";

type SortOrder = "asc" | "desc";
type SortField =
  | "date"
  | "job_title"
  | "company_name"
  | "location"
  | "created_at";

interface ApplicationFilter {
  statusFilter: Status | null;
  sortBy: SortField[] | undefined;
  order: SortOrder | undefined;
  setStatusFilter: (status: Status | null) => void;
  setSort: (sortBy: SortField[], order: SortOrder) => void;
}

const useJobFilterStore = create<ApplicationFilter>((set) => ({
  statusFilter: null,
  sortBy: undefined,
  order: undefined,
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setSort: (sortBy, order) => set({ sortBy, order }),
}));

export { type SortField, type SortOrder, useJobFilterStore };
