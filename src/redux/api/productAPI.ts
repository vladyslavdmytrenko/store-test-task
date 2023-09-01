import { createApi } from '@reduxjs/toolkit/query/react';

import { client } from './client';
import { CreateProduct, Product, ProductResponse } from '@/types';

export const productAPI = createApi({
  reducerPath: 'productApi',
  baseQuery: client,
  tagTypes: ['Products'],
  endpoints: builder => ({
    productList: builder.query<ProductResponse, void>({
      query: () => `products`,
    }),
    productDetails: builder.query<ProductResponse, string>({
      query: id => `products/${id}`,
    }),
    creteProduct: builder.mutation<ProductResponse, CreateProduct>({
      query: product => ({
        url: `products/add`,
        method: 'POST',
        body: product,
      }),
    }),
    updateProduct: builder.mutation<
      ProductResponse,
      Partial<CreateProduct> & Pick<Product, 'id'>
    >({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: { patch },
      }),
    }),
    deleteProduct: builder.mutation<CreateProduct, void>({
      query: id => ({ url: `products/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const { useProductListQuery } = productAPI;
