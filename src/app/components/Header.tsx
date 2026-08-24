import Input from './Input';
import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/product.service';
import type { ProductProps } from '../interfaces/Product';
import { useState, type ChangeEvent } from 'react';
import _, { debounce } from 'loadsh';

const Header = () => {
  const [productName, setProductName] = useState('');

  const {
    data: productByName,
    isLoading,
    error,
  } = useQuery<ProductProps[], Error>({
    queryKey: ['query-products-by-name', productName],
    queryFn: () => ProductService.searchName(productName),
    enabled: !!productName, // Converte a string preenchida para true, e vazia para false
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
  };

  const debounceHandleOnChange = debounce(handleInput, 500);
  return (
    <header className="fixed top-0 right-0 flex w-full items-center justify-center bg-white py-3">
      <div className="mx-auto flex w-11/12 items-center justify-between gap-52">
        <div>
          <a href="/">
            <img
              src="./assets/shopping-market-tic.png"
              alt="Logo"
              className="max-w-15"
            />
          </a>
        </div>
        <div className="w-4/5">
          <Input onChange={debounceHandleOnChange} />
        </div>
        <ul>
          {productByName?.map((product: ProductProps) => {
            return <li>{product.nome}</li>;
          })}
        </ul>
        <div className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Carrinho
        </div>
      </div>
    </header>
  );
};

export default Header;
