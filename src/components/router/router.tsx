import { ROUTER_URL_LIST } from '@/constant';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter(
  [
    {
      path: ROUTER_URL_LIST.PRODUCT,
      async lazy() {
        const { Product } = await import('@/pages/Product');

        return { element: <Product /> };
      },
      children: [
        {
          index: true,
          element: <Navigate to={ROUTER_URL_LIST.PRODUCT_OVERVIEW} />,
        },
        {
          path: ROUTER_URL_LIST.PRODUCT_OVERVIEW,
          async lazy() {
            const { ProductOverview } = await import(
              '@pages/Product/ProductOverview'
            );
            return {
              element: <ProductOverview />,
            };
          },
        },
        {
          path: ROUTER_URL_LIST.PRODUCT_CREATE,
          async lazy() {
            const { ProductCreate } = await import(
              '@pages/Product/ProductCreate'
            );
            return {
              element: <ProductCreate />,
            };
          },
        },

        {
          path: ROUTER_URL_LIST.PRODUCT_DETAILS,
          async lazy() {
            const { ProductDetail } = await import(
              '@pages/Product/ProductDetail'
            );
            return {
              element: <ProductDetail />,
            };
          },
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/store-test-task/' }
);
