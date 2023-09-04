import { ChangeEvent, MouseEvent, ReactElement } from 'react';
import { HeaderContext } from '@tanstack/react-table';

import { DebouncedInput } from '@components/DebouncedInput';

import styles from './ProductHeaderCell.module.scss';

interface IProductHeaderCell<TData> {
  cellName: string;
  table: HeaderContext<TData, unknown>;
}

export const ProductHeaderCell: <TData>(
  p: IProductHeaderCell<TData>
) => ReactElement<IProductHeaderCell<TData>> = ({ cellName, table }) => {
  const sortDirections = table.column.getIsSorted();
  const columnFilterValue = table.column.getFilterValue();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.column.setFilterValue(e.target.value);
  };

  const handleClick = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const isCanSorted = table.header.column.getCanSort();

  return (
    <div
      className={`d-flex flex-column justify-content-start gap-3 ${styles.product_header_cell}`}
    >
      <div
        className={`d-flex justify-content-between ${
          isCanSorted ? styles.product_header_cell__can_sort : ''
        }`}
      >
        {cellName}

        {table.header.column.getCanSort() && (
          <div className='d-flex flex-column align-items-start'>
            <i
              className={`bi bi-caret-up${
                sortDirections === 'asc' ? '-fill' : ''
              } ${styles.product_header_cell_icon}`}
            />
            <i
              className={`bi bi-caret-down${
                sortDirections === 'desc' ? '-fill' : ''
              }  ${styles.product_header_cell_icon}`}
            />
          </div>
        )}
      </div>

      <div>
        {table.header.column.getCanFilter() && (
          <DebouncedInput
            className='form-control'
            type={'text'}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onDebouncedChange={handleChange}
            placeholder='Filter'
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};
