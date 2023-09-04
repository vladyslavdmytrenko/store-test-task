import { FC } from 'react';
import * as yup from 'yup';
import { Field, Formik } from 'formik';

import { InputField } from '@components/formikFields';

import { productValidationSchema } from '@pages/Product/components/ProductForm/validation.ts';

import { Product } from '@/types';

interface IProductForm {
  initialValue?: Product;
  onSubmit: (
    values: yup.InferType<typeof productValidationSchema>
  ) => Promise<void>;
}
export const ProductForm: FC<IProductForm> = ({ initialValue, onSubmit }) => {
  const formInitialValues: yup.InferType<typeof productValidationSchema> = {
    title: initialValue?.title || '',
    date: new Date(Date.now()),
    rate: initialValue?.rating || 0,
    author: '',
  };

  const handleOnSubmitForm = async (
    values: yup.InferType<typeof productValidationSchema>
  ) => {
    await onSubmit(values);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={formInitialValues}
      validationSchema={productValidationSchema}
      onSubmit={handleOnSubmitForm}
    >
      {({ values, errors, touched, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='w-100'>
              <div className='form-label'>
                Title
                <span className='form-required'>*</span>
              </div>
              <Field
                component={InputField}
                className={`form-control ${
                  touched.title && errors.title ? 'is-invalid' : ''
                }`}
                name='title'
                type='text'
                placeholder='Enter title'
                value={values.title}
              />

              {touched.title && errors.title && (
                <div className='invalid-feedback'>{errors.title}</div>
              )}
            </label>
          </div>

          <div className='mb-3'>
            <label className='w-100'>
              <div className='form-label'>
                Author
                <span className='form-required'>*</span>
              </div>

              <Field
                component={InputField}
                className={`form-control ${
                  touched.author && errors.author ? 'is-invalid' : ''
                }`}
                name='author'
                type='text'
                placeholder='Enter author'
                value={values.author}
              />

              {touched.author && errors.author && (
                <div className='invalid-feedback'>{errors.author}</div>
              )}
            </label>
          </div>

          <div className='mb-3'>
            <label className='w-100'>
              <div className='form-label'>
                Rate
                <span className='form-required'>*</span>
              </div>

              <Field
                component={InputField}
                className={`form-control ${
                  touched.rate && errors.rate ? 'is-invalid' : ''
                }`}
                name='rate'
                type='number'
                placeholder='Enter rate'
                value={values.rate}
              />

              {touched.rate && errors.rate && (
                <div className='invalid-feedback'>{errors.rate}</div>
              )}
            </label>
          </div>

          <div className='mb-3'>
            <label className='w-100'>
              <div className='form-label'>
                Date
                <span className='form-required'>*</span>
              </div>

              <Field
                component={InputField}
                className={`form-control ${
                  touched.date && errors.date ? 'is-invalid' : ''
                }`}
                name='date'
                type='date'
                placeholder='Enter date'
                value={values.date}
              />

              {touched.date && errors.date && (
                <div className='invalid-feedback'>{String(errors.date)}</div>
              )}
            </label>
          </div>

          <button
            type='submit'
            className='btn btn-primary'
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};
