import { v4 as uuid } from "uuid";
import { handlerWrapper } from "../lib/handler";
import { generateUploadURL } from "../lib/r2";
import { requireEnv } from "../lib/env";

const R2_PUBLIC_URL = requireEnv("R2_PUBLIC_URL");

async function generateUploadUrlHandler(req: any, res: any): Promise<void> {
  const requestId = req.requestId;

  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed", requestId });
    return;
  }

  const t0 = Date.now();

  const id = uuid();
  const key = `uploads/${id}.pdf`;
  console.log(`[${requestId}] GENERATE URL:`, key);

  const url = await generateUploadURL(key);

  console.log(`[${requestId}] generate-upload-url took ${Date.now() - t0}ms`);

  res.json({
    success: true,
    data: {
      uploadUrl: url,
      fileUrl: `${R2_PUBLIC_URL}/${key}`
    },
    requestId
  });
}

export default handlerWrapper(generateUploadUrlHandler);
