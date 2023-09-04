import { ReactElement, useState } from 'react';
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface IProductProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  handleClickRow?: (data: Cell<TData, unknown>[]) => void;
}

export const Table: <TData>(
  p: IProductProps<TData>
) => ReactElement<IProductProps<TData>> = ({
  columns,
  data,
  handleClickRow,
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  const handleRowClick =
    (cellData: Cell<(typeof data)[0], unknown>[]) => () => {
      handleClickRow && handleClickRow(cellData);
    };

  return (
    <>
      <table className='table table-striped table-bordered'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  className='align-top'
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className='table-group-divider'>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={handleRowClick(row.getVisibleCells())}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {!table.getRowModel().rows.length && <h3>Data not found</h3>}
    </>
  );
};
