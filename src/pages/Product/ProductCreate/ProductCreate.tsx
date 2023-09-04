import { FC } from 'react';
import { ProductForm } from '@pages/Product/components/ProductForm';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { ROUTER_URL_LIST } from '@/constant';
import { useCreteProductMutation } from '@/redux/api/productAPI.ts';

import { productValidationSchema } from '@pages/Product/components/ProductForm/validation.ts';

interface ProductCreateProps {}

export const ProductCreate: FC<ProductCreateProps> = () => {
  const [createProduct] = useCreteProductMutation();
  const navigation = useNavigate();
  const productFormSubmit = async (
    values: yup.InferType<typeof productValidationSchema>
  ) => {
    try {
      await createProduct({
        date: String(values.date),
        author: values.author,
        rate: values.rate,
        title: values.title,
      }).unwrap();

      toast.success('Product created');
      navigation(ROUTER_URL_LIST.PRODUCT_OVERVIEW);
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-6'>
        <h3 className='mb-4'>Crete product</h3>
        <ProductForm onSubmit={productFormSubmit} />
      </div>
    </div>
  );
};
