import { connectDB } from "../lib/db";
import { handlerWrapper } from "../lib/handler";
import { getJobs } from "../services/jobService";

async function getJobsHandler(req: any, res: any): Promise<void> {
  const requestId = req.requestId;

  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed", requestId });
    return;
  }

  const t0 = Date.now();

  await connectDB();

  const { shopId, limit = 10, cursor } = req.query;
  console.log(`[${requestId}] GET JOBS:`, req.query);

  if (!shopId) {
    res.status(400).json({ success: false, error: "Missing required fields", requestId });
    return;
  }

  const jobs = await getJobs(String(shopId), Number(limit), cursor ? String(cursor) : undefined);

  console.log(`[${requestId}] get-jobs took ${Date.now() - t0}ms`);

  res.json({ success: true, data: jobs, requestId });
}

export default handlerWrapper(getJobsHandler);
