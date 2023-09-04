import { FC } from 'react';
import { toast } from 'react-toastify';

import { useDeleteProductMutation } from '@/redux/api/productAPI.ts';

interface IProductDeleteModal {
  isOpen: boolean;
  productId: number | null;
  onCloseModal: () => void;
}

export const ProductDeleteModal: FC<IProductDeleteModal> = ({
  isOpen,
  productId,
  onCloseModal,
}) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const handleCloseModal = () => {
    onCloseModal();
  };

  const handleDeleteClick = async () => {
    try {
      await deleteProduct(productId || 0).unwrap();

      toast.success('Product deleted');
    } catch {
      toast.error('Something went wrong');
    } finally {
      onCloseModal();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'd-block' : ''}`}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Product {productId}</h5>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={handleCloseModal}
            />
          </div>

          <div className='modal-body'>
            Are you sure you want to delete the item?
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={handleCloseModal}
            >
              Close
            </button>

            <button
              type='button'
              className='btn btn-danger'
              onClick={handleDeleteClick}
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
