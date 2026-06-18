// shared/components/layout/PageContainer.js

export default function PageContainer({ children }) {
  return (
    <main className="flex-1 overflow-y-auto pb-24 px-4">
      {children}
    </main>
  );
}