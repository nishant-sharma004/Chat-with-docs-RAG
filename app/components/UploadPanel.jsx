"use client";

import { useState } from "react";
import DropZone from "./upload/DropZone";
import UrlInput from "./upload/UrlInput";
import DocList from "./upload/DocList";
import UploadStatus from "./upload/UploadStatus";

export default function UploadPanel({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [error, setError] = useState("");

  const uploadToApi = async (formData, docInfo) => {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      setUploadedDocs((prev) => [
        ...prev,
        { ...docInfo, chunks: data.chunksStored },
      ]);
      onUploadSuccess();
    }
  };

  const handlePdfUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("type", "pdf");
        formData.append("file", file);
        await uploadToApi(formData, { name: file.name, type: "pdf" });
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlUpload = async () => {
    if (!url.trim()) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("type", "url");
      formData.append("url", url);
      await uploadToApi(formData, { name: url, type: "url" });
      setUrl("");
    } catch {
      setError("URL processing failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="w-80 border-r border-gray-200 bg-white 
                    flex flex-col p-6 gap-6"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        📎 Upload Documents
      </h2>
      <DropZone onUpload={handlePdfUpload} uploading={uploading} />
      <UrlInput
        url={url}
        onChange={(e) => setUrl(e.target.value)}
        onAdd={handleUrlUpload}
        uploading={uploading}
      />
      <UploadStatus uploading={uploading} error={error} />
      <DocList docs={uploadedDocs} />
    </div>
  );
}
