import { ColumnDef } from '@tanstack/react-table';

import { Table } from '@/components/Table';
import { Product } from '@/types';

interface ProductTableProps {
  data?: Product[];
}

const columns: ColumnDef<Product>[] = [
  { accessorKey: 'id', cell: info => info.getValue() },
  { accessorKey: 'title', cell: info => info.getValue() },
  { accessorKey: 'description', cell: info => info.getValue() },
  { accessorKey: 'price', cell: info => info.getValue() },
  {
    accessorKey: 'images',
    cell: info => {
      const images = info.getValue() as string[];
      const thumbnail = images.find(item => item.match(/thumbnail/g));

      return <img src={thumbnail || images[0]} height={30} />;
    },
  },
  { accessorKey: 'rating', cell: info => info.getValue() },
  { accessorKey: 'stock', cell: info => info.getValue() },
  { accessorKey: 'category', cell: info => info.getValue() },
];

export const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  return (
    <div className='row'>
      <div className='col-12'>
        {data && <Table data={data} columns={columns} />}
      </div>
    </div>
  );
};
