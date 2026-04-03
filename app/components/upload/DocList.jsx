export default function DocList({ docs }) {
  if (docs.length === 0) return null;

  return (
    <div>
      <p className="text-sm text-gray-500 font-medium mb-2">
        Uploaded Documents
      </p>
      <div className="space-y-2">
        {docs.map((doc, i) => (
          <div
            key={i}
            className="p-3 bg-green-50 border border-green-100 
                       rounded-lg"
          >
            <p className="text-xs font-medium text-green-700 truncate">
              {doc.type === "pdf" ? "📄" : "🔗"} {doc.name}
            </p>
            <p className="text-xs text-green-500 mt-1">
              {doc.chunks} chunks stored ✅
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
