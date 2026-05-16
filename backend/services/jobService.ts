import Job from "../types/job";

export type CreateJobInput = {
  shopId: string;
  fileUrl: string;
  printType: "single" | "duplex";
  colorMode: string;
  copies: number;
  pageRange: string;
};

export const createJob = async (data: CreateJobInput) => Job.create(data);

export const getJobs = async (shopId: string, limit: number, cursor?: string) => {
  const query: any = {
    shopId,
    status: "pending"
  };

  if (cursor) {
    query._id = { $gt: cursor };
  }

  return Job.find(query)
    .sort({ _id: 1 })
    .limit(limit);
};

export const markJobPrinted = async (id: string) =>
  Job.findByIdAndUpdate(id, { status: "printed" }, { new: true });
