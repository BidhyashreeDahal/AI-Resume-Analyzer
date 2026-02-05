import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0] ?? null;
      setFile(selected);
      onFileSelect?.(selected);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: false,
  });

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()} className="p-6">
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="size-20" />
          </div>

          {file ? (
            <div className="text-center">
              <p className="font-semibold">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-500">
                <span className="font-semibold">
                  {isDragActive ? "Drop the PDF here" : "Click to upload"}
                </span>
              </p>
              <p className="text-lg text-gray-500">PDF (max 2 MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
