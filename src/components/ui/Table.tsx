import React from "react";

interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
}

export function Table<T extends { id?: string | number }>({
    data,
    columns,
    onRowClick,
}: TableProps<T>) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={`py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider ${col.className || ""}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {data.map((item, rowIdx) => (
                        <tr
                            key={item.id || rowIdx}
                            onClick={() => onRowClick && onRowClick(item)}
                            className={`group transition-colors duration-200 ${onRowClick ? "cursor-pointer hover:bg-white/5" : ""
                                }`}
                        >
                            {columns.map((col, colIdx) => (
                                <td key={colIdx} className="py-4 px-4 text-sm text-gray-300">
                                    {typeof col.accessor === "function"
                                        ? col.accessor(item)
                                        : (item[col.accessor] as React.ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="py-8 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
