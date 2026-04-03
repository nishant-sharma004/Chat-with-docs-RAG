export default function DropZone({ onUpload, uploading }) {
  return (
    <div>
      <p className="text-sm text-gray-500 font-medium mb-2">Upload PDFs</p>
      <label
        className="w-full flex flex-col items-center 
                        justify-center border-2 border-dashed 
                        border-gray-200 rounded-xl p-6 
                        cursor-pointer hover:border-blue-400
                        hover:bg-blue-50 transition-all"
      >
        <span className="text-3xl mb-2">📄</span>
        <span className="text-sm text-gray-500">
          {uploading ? "Uploading..." : "Click to upload PDFs"}
        </span>
        <span className="text-xs text-gray-400 mt-1">
          Multiple files supported
        </span>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={onUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
