import { useProductListQuery } from '@/redux/api/productAPI';
import { ProductTable } from './components/ProductTable';

interface ProductOverviewProps {}

export const ProductOverview: React.FC<ProductOverviewProps> = () => {
  const { data } = useProductListQuery();

  return (
    <div className='row'>
      <div className='col-12'>
        <ProductTable data={data?.products} />
      </div>
    </div>
  );
};
