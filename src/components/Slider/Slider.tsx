import { FC, useState } from 'react';

import { SliderItem } from '@/types/Slider.ts';

import styles from './Slider.module.scss';

interface ISlider {
  sliderItems?: SliderItem[];
}

enum directions {
  prev,
  next,
}
export const Slider: FC<ISlider> = ({ sliderItems }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const countSlides = sliderItems?.length ? sliderItems?.length - 1 : 0;
  const handleChangeImage = (direction: directions) => () => {
    if (direction === directions.next && activeSlide < countSlides)
      setActiveSlide(activeSlide + 1);

    if (direction === directions.prev && activeSlide > 0)
      setActiveSlide(activeSlide - 1);
  };

  const isDisablePrev = activeSlide === 0;
  const isDisableNext = activeSlide === countSlides;

  const carouselItems = sliderItems?.map(({ alt, imageSrc }, index) => {
    return (
      <div
        className={`carousel-item ${activeSlide === index ? 'active' : ''} ${
          styles.slider_image_container
        }`}
        key={`${index}_${imageSrc}`}
      >
        <img
          src={imageSrc}
          className={`d-block h-100 ${styles.slider_image}`}
          alt={alt}
        />
      </div>
    );
  });

  return (
    <div className='carousel slide'>
      <div className='carousel-inner bg-light'>{carouselItems}</div>

      <button
        className='carousel-control-prev bg-secondary'
        type='button'
        onClick={handleChangeImage(directions.prev)}
        disabled={isDisablePrev}
      >
        <span className='carousel-control-prev-icon'></span>
        <span className='visually-hidden'>Previous</span>
      </button>

      <button
        className='carousel-control-next bg-secondary'
        type='button'
        onClick={handleChangeImage(directions.next)}
        disabled={isDisableNext}
      >
        <span className='carousel-control-next-icon'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  );
};
