import { FC, useState } from 'react';

import { useProductListQuery } from '@/redux/api/productAPI';

import { ProductTable } from './components/ProductTable';
import { SearchProduct } from './components/SearchProduct';

import { ProductUrlParams } from '@/types';

interface ProductOverviewProps {}

export const ProductOverview: FC<ProductOverviewProps> = () => {
  const [productParams, setProductParams] = useState<ProductUrlParams>({});
  const { data, isLoading } = useProductListQuery(productParams);

  const handleSearchProduct = (param: ProductUrlParams) => {
    setProductParams(param);
  };

  return (
    <div className='row'>
      <div className='col-4'>
        <SearchProduct onSearch={handleSearchProduct} />
      </div>

      <div className='col-12'>
        <ProductTable data={data?.products} isLoading={isLoading} />
      </div>
    </div>
  );
};
