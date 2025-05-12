export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[30%_70%] gap-4 border-b last:border-b">
      {children}
    </div>
  );
}
