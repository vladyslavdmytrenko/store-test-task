import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { client } from './client';

import {
  CreateProduct,
  Product,
  ProductCategories,
  ProductResponse,
  ProductUrlParams,
} from '@/types';

export const productAPI = createApi({
  reducerPath: 'productApi',
  baseQuery: client,
  tagTypes: ['Products'],
  endpoints: builder => ({
    productList: builder.query<ProductResponse, ProductUrlParams>({
      query: ({ q, category }) => {
        const params: FetchArgs = {
          url: `products${category ? `/category/${category}` : ''}`,
        };

        if (q) {
          params.url = `products/search`;
          params.params = { q };
        }

        return params;
      },
    }),
    productDetails: builder.query<Product, string>({
      query: id => `products/${id}`,
    }),
    creteProduct: builder.mutation<ProductResponse, CreateProduct>({
      query: product => ({
        url: `products/add`,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
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
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<CreateProduct, number>({
      query: id => ({ url: `products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Products'],
    }),

    productCategories: builder.query<ProductCategories, void>({
      query: () => `products/categories`,
    }),
  }),
});

export const {
  useProductListQuery,
  useProductDetailsQuery,
  useProductCategoriesQuery,
  useCreteProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
