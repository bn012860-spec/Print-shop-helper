export type JobStatus = "pending" | "printed";

export type PrintType = "single" | "duplex";

export type Job = {
  _id: string;
  shopId: string;
  fileUrl: string;
  printType: PrintType;
  colorMode: string;
  copies: number;
  pageRange: string;
  status: JobStatus;
  createdAt: string;
};

export type CreateJobPayload = {
  shopId: string;
  fileUrl: string;
  printType: PrintType;
  colorMode: string;
  copies: number;
  pageRange: string;
};

export type UploadUrlResponse = {
  uploadUrl: string;
  fileUrl: string;
};
