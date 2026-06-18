export default function GridView({
  columns = 4,
  gap = 3,
  children,
}) {
  const cols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    8: "grid-cols-8",
  };

  const gaps = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
  };

  return (
    <div
      className={`
        grid
        ${cols[columns] ?? "grid-cols-4"}
        ${gaps[gap] ?? "gap-3"}
      `}
    >
      {children}
    </div>
  );
}