import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from '@components/Layout';

interface ProductProps {}

export const Product: FC<ProductProps> = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
