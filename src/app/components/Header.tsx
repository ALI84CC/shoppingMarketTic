import Input from './Input';
import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/product.service';
import type { ProductProps } from '../interfaces/Product';
import { useMemo, useState, type ChangeEvent } from 'react';
import { debounce } from 'lodash';
import List from './List';

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

   const debounceHandleOnChange = useMemo(() => {
    return debounce(handleInput, 500);
  }, []);

  return (
    <header className="fixed top-0 right-0 z-50 h-20  flex w-full items-center justify-center bg-white py-4 shadow-md  border-b border-gray-500">
      <div className="mx-auto flex w-11/12 items-center justify-between gap-8">
        <div className='shrink-0 w-32'>
          <a href="/">
            <img
              src="./assets/shopping-market-tic.png"
              alt="Logo"
              className="w-16 h-auto object-contain"
            />
          </a>
        </div>

        <div className="relative flex-1 max-w-2xl flex items-center" >
          <Input onChange={debounceHandleOnChange as any} />

          {productName.trim() !== '' && productByName && (

          <ul className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-md bg-white p-2 shadow-xl border border-gray-200">
            {productByName.map((product: ProductProps) => (
              <List key={product.id} className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer">
                <span className="font-medium text-gray-800">{product.nome}</span>
                <div className="flex items-center gap-3">
                  <img src={product.imagem} className="h-10 w-10 rounded object-cover" alt={product.nome} />
                  <span className="text-sm font-semibold text-green-600">R$ {product.preco}</span>
                </div>
              </List>
            ))}
          </ul>
          )}
        </div>

        <div className="shrink-0">
          <button className="rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-600 transition-colors cursor-pointer">
            Carrinho
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
