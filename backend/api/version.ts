import { handlerWrapper } from "../lib/handler";

async function versionHandler(req: any, res: any): Promise<void> {
  const requestId = req.requestId;

  res.json({
    success: true,
    data: {
      version: process.env.VERCEL_GIT_COMMIT_SHA || "dev",
      time: Date.now()
    },
    requestId
  });
}

export default handlerWrapper(versionHandler);
