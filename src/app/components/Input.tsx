import { tv } from 'tailwind-variants';
import type { ComponentProps } from 'react';

type InputProps = ComponentProps<"input">;

const inputVariants = tv({
  base: 'w-full rounded-md bg-gray-100 border border-gray-200 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none transition-all',
});

const Input = ({ onChange, placeholder = 'Search...', ...props }: InputProps) => {
  return (
    <input
      type="text"
       id="search-products" // Adicionado para acessibilidade
      name="search-products" // Adicionado para o navegador
      onChange={onChange}
      placeholder={placeholder}
      className={inputVariants()}
      {...props}
    />
  );
};

export default Input;
