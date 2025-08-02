import { z } from "zod";

export const StatusEnum = z.enum([
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "SAVED",
]);

export type StatusEnumType = z.infer<typeof StatusEnum>;

export const ApplicationSchema = z.object({
  id: z.string(),
  job_title: z.string(),
  company_name: z.string(),
  location: z.string(),
  status: StatusEnum,
  job_post_url: z.string(),
  resume_url: z.instanceof(File).optional(),
  cover_letter_url: z.instanceof(File).optional(),
});

export const createApplicationSchema = z.object({
  job_title: z.string(),
  company_name: z.string(),
  location: z.string().optional(),
  status: StatusEnum.optional(),
  job_post_url: z.string(),
  resume_url: z.instanceof(File).optional(),
  cover_letter_url: z.instanceof(File).optional(),
});

export const updateApplicationSchema = z.object({
  job_title: z.string().optional(),
  company_name: z.string().optional(),
  location: z.string().optional(),
  status: StatusEnum.optional(),
  job_post_url: z.string().optional(),
  resume_url: z.instanceof(File).optional(),
  cover_letter_url: z.instanceof(File).optional(),
});

export type Application = z.infer<typeof ApplicationSchema>;
export type Status = z.infer<typeof StatusEnum>;
export type ApplicationUpdate = z.infer<typeof updateApplicationSchema>;
export type ApplicationCreate = z.infer<typeof createApplicationSchema>;
