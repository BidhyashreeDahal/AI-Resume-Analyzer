import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const maxFileSize = 20 * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const picked = acceptedFiles[0] ?? null;
      setFile(picked);
      onFileSelect?.(picked);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
    noKeyboard: true,
    noClick: true,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
  };

  return (
    <div className="w-full gradient-border">
      <div
        {...getRootProps()}
        className="p-4 rounded-2xl cursor-pointer max-h-44 overflow-hidden"
        onClick={() => open()} // click anywhere opens file picker
      >
        <input {...getInputProps()} />

        <div className="space-y-3 text-center">
          {file ? (
            <div
              className="uploader-selected-file flex items-center justify-between gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="w-10 h-10" />

              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>

              <button type="button" className="p-2" onClick={removeFile}>
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-12 h-12 flex items-center justify-center mb-2">
                <img src="/icons/info.svg" alt="upload" className="w-10 h-10" />
              </div>

              <p className="text-base text-gray-500">
                <span className="font-semibold">
                  {isDragActive ? "Drop your PDF here" : "Click to upload"}
                </span>{" "}
                or drag and drop
              </p>

              <p className="text-sm text-gray-500">
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
