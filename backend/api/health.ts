import { connectDB } from "../lib/db";
import { handlerWrapper } from "../lib/handler";

async function healthHandler(req: any, res: any): Promise<void> {
  const requestId = req.requestId;
  const t0 = Date.now();

  await connectDB();

  console.log(`[${requestId}] health took ${Date.now() - t0}ms`);

  res.json({
    success: true,
    data: {
      status: "ok",
      time: Date.now()
    },
    requestId
  });
}

export default handlerWrapper(healthHandler);
