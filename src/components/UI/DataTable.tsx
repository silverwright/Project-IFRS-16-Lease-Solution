import React from 'react';

interface Column {
  key: string;
  label: string;
  format?: (value: any) => string;
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
}

export function DataTable({ title, data, columns }: DataTableProps) {
  return (
    <div>
      <h4 className="font-semibold text-slate-900 mb-4">{title}</h4>
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.slice(0, 10).map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-slate-900 whitespace-nowrap">
                    {column.format ? column.format(row[column.key]) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 10 && (
          <div className="bg-slate-50 px-4 py-3 text-sm text-slate-600 text-center border-t border-slate-200">
            Showing first 10 of {data.length} rows
          </div>
        )}
      </div>
    </div>
  );
}