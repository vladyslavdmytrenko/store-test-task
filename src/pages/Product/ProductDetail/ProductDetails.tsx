import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useProductDetailsQuery } from '@/redux/api/productAPI.ts';

import { Slider } from '@components/Slider';
import { Spinner } from '@components/Spinner';

import { SliderItem } from '@/types/Slider.ts';

interface IProductDetail {}
export const ProductDetail: FC<IProductDetail> = () => {
  const { id } = useParams();
  const { data, isLoading } = useProductDetailsQuery(id || '');

  if (isLoading) {
    return (
      <div className='row justify-content-center'>
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className='row justify-content-center'>
        <h3 className='text-center'>Product not found</h3>
      </div>
    );
  }

  const slides: SliderItem[] = data.images.map(src => ({
    imageSrc: src,
    alt: data.title,
  }));

  return (
    <div className='row justify-content-center'>
      <div className='col-7'>
        <h5 className='card-title my-2 d-flex justify-content-between'>
          <span>
            {data.brand} {data.title}
          </span>

          <span>{data.price.toFixed(2)} $</span>
        </h5>

        <p className='card-text'>{data.category}</p>

        <Slider sliderItems={slides} />

        <div className='card-body mt-2'>
          <p className='card-text'>{data.description}</p>

          <p className='card-text'>Rating: {data.rating}</p>
        </div>
      </div>
    </div>
  );
};
