import mongoose from "mongoose";
import { requireEnv } from "./env";

const MONGO_URI = requireEnv("MONGO_URI");

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(MONGO_URI);
};
