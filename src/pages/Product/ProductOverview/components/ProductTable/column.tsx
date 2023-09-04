import { MouseEvent } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { ProductHeaderCell } from './components/ProductHeaderCell';

import { Product } from '@/types';
import { productTableActions } from '@/types/enums';

export const createProductColumns = (
  onAction: (action: productTableActions, id: number) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: 'id',
    enableColumnFilter: false,
    enableSorting: false,
    header: data => {
      return <ProductHeaderCell cellName='Id' table={data} />;
    },
    cell: info => info.getValue(),
    minSize: 200,
  },
  {
    accessorKey: 'title',
    header: data => {
      return <ProductHeaderCell cellName='Title' table={data} />;
    },
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'description',
    header: data => {
      return <ProductHeaderCell cellName='Description' table={data} />;
    },
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'price',
    header: data => {
      return <ProductHeaderCell cellName='Price' table={data} />;
    },
    cell: info => `${Number(info.getValue()).toFixed(2)} $`,
  },
  {
    accessorKey: 'images',
    enableSorting: false,
    enableColumnFilter: false,
    header: data => {
      return <ProductHeaderCell cellName='Image' table={data} />;
    },
    cell: info => {
      const images = info.getValue() as string[];
      const thumbnail = images.find(item => item.match(/thumbnail/g));

      return (
        <img src={thumbnail || images[0]} height={30} alt='Product preview' />
      );
    },
  },
  {
    accessorKey: 'rating',
    header: data => {
      return <ProductHeaderCell cellName='Rating' table={data} />;
    },
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'stock',
    header: data => {
      return <ProductHeaderCell cellName='Stock' table={data} />;
    },
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'category',
    header: data => {
      return <ProductHeaderCell cellName='Price' table={data} />;
    },
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'action',
    enableSorting: false,
    enableColumnFilter: false,
    header: data => {
      return <ProductHeaderCell cellName='Actions' table={data} />;
    },
    cell: info => {
      const handleClick =
        (action: productTableActions) => (e: MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          onAction(action, info.row.original.id);
        };

      return (
        <div className='btn-group' role='group' aria-label='Basic example'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={handleClick(productTableActions.edit)}
          >
            <i className='bi bi-pen-fill' />
          </button>

          <button
            type='button'
            className='btn btn-danger'
            onClick={handleClick(productTableActions.delete)}
          >
            <i className='bi bi-trash-fill' />
          </button>
        </div>
      );
    },
  },
];
