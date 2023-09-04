import { FC, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Cell } from '@tanstack/react-table';

import { Spinner } from '@components/Spinner';
import { Table } from '@/components/Table';
import { createProductColumns } from '@pages/Product/ProductOverview/components/ProductTable/column.tsx';
import { ProductDeleteModal } from '@pages/Product/ProductOverview/components/ProductTable/components/ProductDeleteModal';

import { ROUTER_URL_LIST } from '@/constant';

import { Product } from '@/types';
import { productTableActions } from '@/types/enums';
import { ProductEditModal } from '@pages/Product/ProductOverview/components/ProductTable/components/ProductEditModal';

interface ProductTableProps {
  isLoading: boolean;
  data?: Product[];
}

export const ProductTable: FC<ProductTableProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const handleRowClick = (cells: Cell<Product, unknown>[]) => {
    const id = cells
      .find(({ column }) => column.id === 'id')
      ?.getContext()
      .getValue();

    navigate(generatePath(ROUTER_URL_LIST.PRODUCT_DETAILS, { id }));
  };

  const handleColumnAction = (action: productTableActions, id: number) => {
    setSelectedProductId(id);

    switch (action) {
      case productTableActions.delete:
        setIsDeleteModalOpen(true);
        break;

      case productTableActions.edit:
        setIsEditModalOpen(true);
        break;

      default:
        break;
    }
  };

  const tableColumns = createProductColumns(handleColumnAction);

  return (
    <div className='row'>
      <div className='col-12'>
        {isLoading && <Spinner />}

        {data && (
          <Table
            data={data}
            columns={tableColumns}
            handleClickRow={handleRowClick}
          />
        )}
      </div>

      <ProductDeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={() => setIsDeleteModalOpen(false)}
        productId={selectedProductId}
      />

      <ProductEditModal
        isOpen={isEditModalOpen}
        onCloseModal={() => setIsEditModalOpen(false)}
        productId={selectedProductId}
      />
    </div>
  );
};
