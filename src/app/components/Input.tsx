import { tv } from 'tailwind-variants';
import { type ChangeEvent } from 'react';

interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // adicione outras props aqui se houver, como placeholder, value, etc.
}

const inputVariants = tv({
  base: 'w-full rounded bg-gray-200 p-2 placeholder:text-gray-500 focus:outline-none',
});

const Input = ({ onChange, ...props }: InputProps) => {
  return (
    <input
      type="text"
      onChange={onChange} // O input nativo do HTML sabe o que fazer com isso
      placeholder="Search..."
      className={inputVariants.base}
      {...props}
    />
  );
};

export default Input;
