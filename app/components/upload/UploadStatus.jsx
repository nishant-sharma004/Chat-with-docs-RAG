export default function UploadStatus({ uploading, error }) {
  return (
    <>
      {uploading && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <div
            className="w-4 h-4 border-2 border-blue-200 
                          border-t-blue-600 rounded-full animate-spin"
          />
          Processing document...
        </div>
      )}
      {error && <p className="text-red-500 text-sm">❌ {error}</p>}
    </>
  );
}
