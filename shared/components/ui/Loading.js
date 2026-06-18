// shared/components/ui/Loading.js

export default function Loading({ 
  fullscreen = false,
  size = "md",
  message = "در حال بارگذاری..."
}) {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div
        className={`
          ${sizeClasses[size]}
          border-gray-300 border-t-blue-600
          rounded-full animate-spin
        `}
      />
      
      {/* Message */}
      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}
    </div>
  );

  // Fullscreen Loading
  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  // Inline Loading
  return (
    <div className="flex items-center justify-center py-8">
      {spinner}
    </div>
  );
}
