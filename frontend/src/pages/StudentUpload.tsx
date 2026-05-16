import { useState } from "react";
import FileUpload from "../components/FileUpload";
import PrintSettings from "../components/PrintSettings";
import { createJob, getUploadUrl } from "../api/job";
import { CreateJobPayload } from "../types/job";

const DEFAULT_SETTINGS: Omit<CreateJobPayload, "shopId" | "fileUrl"> = {
  printType: "duplex",
  colorMode: "bw",
  copies: 1,
  pageRange: "all"
};

export default function StudentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const { uploadUrl, fileUrl } = await getUploadUrl();
      console.log("Upload URL:", uploadUrl);
      console.log("File URL:", fileUrl);

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/pdf" },
        body: file
      });

      if (!uploadRes.ok) {
        throw new Error("Upload to storage failed");
      }

      console.log("Creating job...");
      await createJob({
        shopId: "shop1",
        fileUrl,
        ...settings
      });

      setMessage("Job created successfully.");
      setFile(null);
    } catch (error) {
      const err = error as Error;
      setMessage(err.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Student Upload</h1>
      <FileUpload onFileSelected={setFile} />
      <PrintSettings values={settings} onChange={setSettings} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Submit"}
      </button>
      <p>{message}</p>
    </div>
  );
}
