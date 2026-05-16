const generateRequestId = () => Math.random().toString(36).slice(2, 10);

export const handlerWrapper =
  (fn: (req: any, res: any) => Promise<void>) =>
  async (req: any, res: any): Promise<void> => {
    const requestId = generateRequestId();
    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);

    console.log(`[${requestId}] ${req.method} ${req.url}`);

    try {
      await fn(req, res);
    } catch (err) {
      console.error(`[${requestId}] API ERROR`, err);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        requestId
      });
    }
  };
