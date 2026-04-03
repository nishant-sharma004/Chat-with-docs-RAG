export default function LoadingDots() {
  return (
    <div className="flex justify-start">
      <div
        className="bg-white border border-gray-200
                      rounded-2xl rounded-bl-none px-4 py-3
                      shadow-sm"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
          <span className="text-xs text-gray-400">Searching documents...</span>
        </div>
      </div>
    </div>
  );
}
