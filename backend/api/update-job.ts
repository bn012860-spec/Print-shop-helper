import { connectDB } from "../lib/db";
import { handlerWrapper } from "../lib/handler";
import { markJobPrinted } from "../services/jobService";

async function updateJobHandler(req: any, res: any): Promise<void> {
  const requestId = req.requestId;

  if (req.method !== "PATCH") {
    res.status(405).json({ success: false, error: "Method not allowed", requestId });
    return;
  }

  const t0 = Date.now();

  await connectDB();

  const { id } = req.query;
  console.log(`[${requestId}] UPDATE JOB:`, req.query);

  if (!id) {
    res.status(400).json({ success: false, error: "Missing required fields", requestId });
    return;
  }

  const updatedJob = await markJobPrinted(String(id));

  console.log(`[${requestId}] update-job took ${Date.now() - t0}ms`);

  res.json({ success: true, data: updatedJob, requestId });
}

export default handlerWrapper(updateJobHandler);
