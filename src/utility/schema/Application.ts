import { z } from "zod";

export const StatusEnum = z.enum([
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "SAVED",
]);

export const ApplicationSchema = z.object({
  id: z.string(),
  job_title: z.string(),
  company_name: z.string(),
  location: z.string(),
  status: StatusEnum,
  job_post_url: z.string(),
  resume_url: z.string(),
  cover_letter_url: z.string(),
});

export type Application = z.infer<typeof ApplicationSchema>;
export type Status = z.infer<typeof StatusEnum>;
