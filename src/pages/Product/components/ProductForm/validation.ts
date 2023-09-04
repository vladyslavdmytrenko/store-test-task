import * as yup from 'yup';

export const productValidationSchema = yup.object({
  title: yup.string().trim().required(),
  author: yup.string().trim().required(),
  date: yup.date().default(() => new Date()),
  rate: yup.number().min(0).max(5).required(),
});
