import { FC, FocusEvent, WheelEvent } from 'react';
import { FieldProps } from 'formik';

interface InputFieldProps extends FieldProps {}

export const InputField: FC<InputFieldProps> = ({ field, form, ...props }) => {
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    form.setFieldValue(field.name, e.currentTarget.value.trim());

    setTimeout(() => form.setFieldTouched(field.name, true, true));
  };

  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <input {...field} {...props} onBlur={handleBlur} onWheel={handleWheel} />
  );
};
