import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: maxFileSize,
    accept: { "application/pdf": [".pdf"] },
  });

  const file = selectedFile;

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 text-center transition-all duration-300 cursor-pointer bg-[#1a1a1a] border-2 border-dashed rounded-xl 
      ${isDragActive ? "border-[#02C173]" : "border-gray-700"} hover:border-gray-500`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        {file ? (
          <div
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-[#02C173]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1.5 2.5a.5.5 0 000 1h5a.5.5 0 000-1h-5zM5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 015 8zm0 2a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 015 10zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-200 font-medium truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-sm text-gray-400">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              className="p-2 cursor-pointer text-gray-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                onFileSelect?.(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-lg text-gray-400">
              <span className="font-semibold text-[#02C173]">
                Click to upload{" "}
              </span>
              or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              PDF only (max {formatSize(maxFileSize)})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
