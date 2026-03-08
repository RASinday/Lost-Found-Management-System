export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  width?: string;
};

export default function DataTable<T>({
  columns,
  rows,
  emptyText = "No data.",
}: {
  columns: Column<T>[];
  rows: T[];
  emptyText?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg sm:rounded-xl bg-white/5 ring-1 ring-white/10">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <table className="w-full min-w-225 md:min-w-180 border-collapse">
          <thead>
            <tr className="bg-white/5">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-[11px] font-semibold text-white/60"
                  style={c.width ? { width: c.width } : undefined}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 sm:px-4 py-6 sm:py-8 text-center text-xs sm:text-sm text-white/50"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  {columns.map((c) => (
                    <td key={c.key} className="px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-white/85">
                      {c.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
