import React from 'react';

import { useProductCategoriesQuery } from '@/redux/api/productAPI';
import { DebouncedInput } from '@components/DebouncedInput';

import { ProductUrlParams } from '@/types';

interface SearchProductProps {
  onSearch: (param: ProductUrlParams) => void;
}

export const SearchProduct: React.FC<SearchProductProps> = ({ onSearch }) => {
  const { data } = useProductCategoriesQuery();

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (data && data.find(item => item === value)) {
      onSearch({ category: value });
      return;
    }

    onSearch({ q: value });
  };

  return (
    <div className='col-auto'>
      <label className='sr-only' htmlFor='inlineFormInputGroup'>
        Search
      </label>

      <div className='input-group mb-2'>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <i className='bi bi-search'></i>
          </div>
        </div>

        <DebouncedInput
          type='text'
          className='form-control'
          id='inlineFormInputGroup'
          placeholder='Enter serach param'
          onDebouncedChange={handleSearchProduct}
          debounceTime={500}
        />
      </div>
    </div>
  );
};
