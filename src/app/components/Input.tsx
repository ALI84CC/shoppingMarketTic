import { tv } from 'tailwind-variants';

const inputVariants = tv({
  base: 'w-full rounded bg-gray-200 p-2 placeholder:text-gray-500 focus:outline-none',
});

const Input = () => {
  return <input placeholder="Search..." className={inputVariants.base} />;
};

export default Input;
