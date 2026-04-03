export default function UrlInput({ url, onChange, onAdd, uploading }) {
  return (
    <div>
      <p className="text-sm text-gray-500 font-medium mb-2">Or enter a URL</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={onChange}
          placeholder="https://example.com"
          className="flex-1 text-sm border border-gray-200 
                     rounded-lg px-3 py-2 focus:outline-none
                     focus:border-blue-400"
        />
        <button
          onClick={onAdd}
          disabled={uploading}
          className="px-3 py-2 bg-blue-600 text-white 
                     rounded-lg text-sm font-medium
                     hover:bg-blue-700 disabled:opacity-50
                     transition-all"
        >
          Add
        </button>
      </div>
    </div>
  );
}
