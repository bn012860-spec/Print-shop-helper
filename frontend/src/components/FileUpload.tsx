import { ChangeEvent } from "react";

type FileUploadProps = {
  onFileSelected: (file: File | null) => void;
};

export default function FileUpload({ onFileSelected }: FileUploadProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onFileSelected(file);
  };

  return <input type="file" accept="application/pdf" onChange={handleChange} />;
}
