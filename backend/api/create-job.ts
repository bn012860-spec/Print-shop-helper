import { connectDB } from "../lib/db";
import { handlerWrapper } from "../lib/handler";
import { createJob } from "../services/jobService";

async function createJobHandler(req: any, res: any): Promise<void> {
  const requestId = req.requestId;

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed", requestId });
    return;
  }

  const t0 = Date.now();

  await connectDB();

  const { shopId, fileUrl, printType, colorMode, copies, pageRange } = req.body;
  console.log(`[${requestId}] CREATE JOB:`, req.body);

  if (!shopId || !fileUrl) {
    res.status(400).json({ success: false, error: "Missing required fields", requestId });
    return;
  }

  if (!printType || !["single", "duplex"].includes(printType)) {
    res.status(400).json({ success: false, error: "Invalid printType", requestId });
    return;
  }

  const job = await createJob({
    shopId,
    fileUrl,
    printType,
    colorMode,
    copies,
    pageRange
  });

  console.log(`[${requestId}] create-job took ${Date.now() - t0}ms`);

  res.status(201).json({ success: true, data: job, requestId });
}

export default handlerWrapper(createJobHandler);
