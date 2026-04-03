export default function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="flex justify-start">
      <div
        className="max-w-[80%] rounded-2xl px-4 py-3 text-sm
                      bg-red-50 border border-red-200
                      text-red-600 rounded-bl-none"
      >
        <p className="font-medium mb-1">⚠️ Something went wrong</p>
        <p className="text-xs text-red-400">
          Please try again or rephrase your question.
        </p>
      </div>
    </div>
  );
}
