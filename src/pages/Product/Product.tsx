import { Layout } from '@components/Layout';
import { Outlet } from 'react-router-dom';

interface ProductProps {}

export const Product: React.FC<ProductProps> = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
