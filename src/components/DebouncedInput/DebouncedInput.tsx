import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { debounce } from 'lodash';

interface IDebouncedInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  initialValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onDebouncedChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  debounceTime?: number;
}

export const DebouncedInput: FC<IDebouncedInput> = ({
  initialValue,
  onChange,
  onDebouncedChange,
  debounceTime = 300,
  ...props
}) => {
  const [value, setValue] = useState(initialValue || '');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      onDebouncedChange && onDebouncedChange(e);
    }, debounceTime),
    [onDebouncedChange]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e);
    debouncedChange(e);
  };

  return <input {...props} value={value} onChange={handleChange} />;
};
