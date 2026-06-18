// shared/components/ui/Button.js

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const base = "w-full py-3 rounded-xl text-sm font-medium transition active:scale-[0.98]";

  const variants = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-100 text-gray-800",
    danger: "bg-red-500 text-white",
    ghost: "bg-transparent text-blue-600",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50" : ""} ${className}`}
    >
      {children}
    </button>
  );
}