// shared/components/layout/SafeArea.js

export default function SafeArea({ children }) {
  return (
    <div className="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {children}
    </div>
  );
}