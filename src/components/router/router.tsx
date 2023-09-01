import { ROUTER_URL_LIST } from '@/constant';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
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
    ],
  },
]);
