import { FC } from 'react';
import { toast } from 'react-toastify';

// import { useUpdateProductMutation } from '@/redux/api/productAPI.ts';
import { ProductForm } from '@pages/Product/components/ProductForm';
import { useUpdateProductMutation } from '@/redux/api/productAPI.ts';
import * as yup from 'yup';
import { productValidationSchema } from '@pages/Product/components/ProductForm/validation.ts';

interface IProductEditModal {
  isOpen: boolean;
  productId: number | null;
  onCloseModal: () => void;
}

export const ProductEditModal: FC<IProductEditModal> = ({
  isOpen,
  productId,
  onCloseModal,
}) => {
  // const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const handleCloseModal = () => {
    onCloseModal();
  };
  const productFormSubmit = async (
    values: yup.InferType<typeof productValidationSchema>
  ) => {
    try {
      await updateProduct({
        id: productId || 0,
        date: String(values.date),
        author: values.author,
        rate: values.rate,
        title: values.title,
      }).unwrap();

      toast.success('Product updated');
      onCloseModal();
    } catch (e) {
      toast.error('Something went wrong');
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
            <ProductForm onSubmit={productFormSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
