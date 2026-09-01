import Input from './Input';
import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/product.service';
import type { ProductProps } from '../interfaces/Product';
import {
  useMemo,
  useState,
  useEffect,
  type ChangeEvent,
  useRef,
  type RefObject,
} from 'react';
import { debounce } from 'lodash';
import List from './List';
import Container from './Container';
import { useOnClickOutside } from '../hooks/useClickOutside';

const Header = () => {
  // Estado local imediato para o valor do input (evita travamentos)
  const [inputValue, setInputValue] = useState('');
  // Estado que realmente vai disparar a busca no TanStack Query
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const refDropDown = useRef<HTMLUListElement | null>(null);

  const { data: productByName, isLoading } = useQuery<ProductProps[], Error>({
    queryKey: ['query-products-by-name', searchTerm],
    queryFn: () => ProductService.searchName(searchTerm),
    enabled: !!searchTerm.trim(), // Só busca se houver texto válidofalse
  });

  useEffect(() => {
    if (productByName) {
      setIsOpen(productByName.length > 0);
    }
  }, [productByName]);

  // Função com debounce que atualiza o termo da busca após 500ms
  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 500),
    [],
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Atualiza a tela instantaneamente
    debouncedSearch(value); // Dispara a busca atrasada
  };

  useOnClickOutside(refDropDown, () => {
    setIsOpen(false);
  });

  return (
    <header className="fixed top-0 right-0 z-50 flex h-20 w-full items-center justify-center border-b border-gray-500 bg-white py-4 shadow-md">
      <Container>
        <div className="mx-auto flex w-11/12 items-center justify-between gap-8">
          <div className="w-32 shrink-0">
            <a href="/">
              <img
                src="./assets/shopping-market-tic.png"
                alt="Logo"
                className="h-auto w-16 object-contain"
              />
            </a>
          </div>

          <div className="relative flex max-w-2xl flex-1 items-center">
            <Input value={inputValue} onChange={handleInput} />
            {isOpen &&
              searchTerm.trim() !== '' &&
              productByName &&
              Array.isArray(productByName) &&
              productByName.length > 0 && (
                <ul
                  ref={refDropDown}
                  className="absolute top-full right-0 left-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-xl"
                >
                  {productByName.map((product: ProductProps) => (
                    <List
                      key={product.id}
                      className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-800">
                        {product.nome}
                      </span>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imagem}
                          className="h-10 w-10 rounded object-cover"
                          alt={product.nome}
                        />
                        <span className="text-sm font-semibold text-green-600">
                          R$ {product.preco}
                        </span>
                      </div>
                    </List>
                  ))}
                </ul>
              )}

            {/* Feedback visual opcional de carregamento */}
            {isLoading && (
              <span className="absolute right-3 text-xs text-gray-400">
                Buscando...
              </span>
            )}
          </div>
          <div className="shrink-0">
            <button className="cursor-pointer rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600">
              Carrinho
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
