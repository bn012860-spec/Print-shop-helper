import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { requireEnv } from "./env";

const R2_ENDPOINT = requireEnv("R2_ENDPOINT");
const R2_ACCESS_KEY = requireEnv("R2_ACCESS_KEY");
const R2_SECRET_KEY = requireEnv("R2_SECRET_KEY");
const R2_BUCKET = requireEnv("R2_BUCKET");

const r2 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY
  }
});

export const generateUploadURL = async (key: string): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    ContentType: "application/pdf"
  });

  return getSignedUrl(r2, command, { expiresIn: 60 });
};
