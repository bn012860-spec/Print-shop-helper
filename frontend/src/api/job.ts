import { apiFetch } from "./client";
import { CreateJobPayload, Job, UploadUrlResponse } from "../types/job";

export const createJob = (payload: CreateJobPayload) =>
  apiFetch<Job>("/create-job", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const getJobs = (shopId: string, limit = 10, cursor?: string) => {
  const search = new URLSearchParams({ shopId, limit: String(limit) });

  if (cursor) {
    search.set("cursor", cursor);
  }

  return apiFetch<Job[]>(`/get-jobs?${search.toString()}`);
};

export const markJobDone = (id: string) =>
  apiFetch<Job | null>(`/update-job?id=${encodeURIComponent(id)}`, {
    method: "PATCH"
  });

export const getUploadUrl = () => apiFetch<UploadUrlResponse>("/generate-upload-url");
