export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
  isReady,
}) {
  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex gap-3">
        <input
          value={value}
          onChange={onChange}
          placeholder={
            isReady
              ? "Ask a question about your documents..."
              : "Upload documents first..."
          }
          disabled={!isReady || isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          className="flex-1 border border-gray-200 rounded-xl
                     px-4 py-3 text-sm focus:outline-none
                     focus:border-blue-400 disabled:bg-gray-50
                     disabled:cursor-not-allowed"
        />
        <button
          onClick={onSend}
          disabled={!isReady || isLoading || !value.trim()}
          className="px-5 py-3 bg-blue-600 text-white rounded-xl
                     font-medium text-sm hover:bg-blue-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
