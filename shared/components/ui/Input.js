// shared/components/ui/Input.js

export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full mb-4">
      
      {label && (
        <label className="block text-xs text-gray-600 mb-1">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full px-4 py-3 rounded-xl border text-sm outline-none
          focus:border-blue-500 transition
          ${error ? "border-red-500" : "border-gray-200"}
          ${className}
        `}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}