import Input from './Input';
import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/product.service';
import { CiShoppingCart } from 'react-icons/ci';
import type { ProductProps } from '../interfaces/Product';
import { useMemo, useState, useEffect, type ChangeEvent, useRef } from 'react';
import { debounce } from 'lodash';
import List from './List';
import Container from './Container';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { Link } from 'react-router-dom';
import { useShoppingList } from '../contexts/ShoppingCart';
import AuthService from '../services/auth.service';

const Header = () => {
  const { totalQtd } = useShoppingList();
  // Estado local imediato para o valor do input (evita travamentos)
  const [inputValue, setInputValue] = useState('');
  // Estado que realmente vai disparar a busca no TanStack Query
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userLogado, setUserLogado] = useState<any>(null);

  const refDropDown = useRef<HTMLUListElement>(null!);

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

  useEffect(() => {
    // Busca os dados do usuário que foram salvos no login/cadastro
    const session = AuthService.getLoggedUser() as any;

    // CORREÇÃO: Verifica se a sessão existe e se a chave username está direta nela
    if (session && session.user && session.user.username) {
      setUserLogado(session.user); // Salva o objeto inteiro direto no estado
    } else {
      setUserLogado(null);
    }
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Atualiza a tela instantaneamente
    debouncedSearch(value); // Dispara a busca atrasada
  };

  useOnClickOutside(refDropDown, () => {
    setIsOpen(false);
  });

  return (
    <header className="fixed top-0 right-0 z-50 flex min-h-20 w-full items-center justify-center border-b border-gray-500 bg-white py-3 shadow-md md:py-4">
      <Container>
        <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-3 px-2 md:w-11/12 md:flex-nowrap md:gap-8 md:px-0">
          {/* 1. Bloco da Logo (sem w-32 no mobile para não roubar espaço) */}
          <div className="shrink-0 md:w-32">
            <Link to="/">
              <img
                src="./assets/shopping-market-tic.png"
                alt="Logo"
                className="h-auto w-12 object-contain md:w-16"
              />
            </Link>
          </div>

          {/* 2. Bloco da Barra de Busca (linha inteira abaixo no mobile; no meio no desktop) */}
          <div className="relative order-3 flex w-full items-center md:order-2 md:max-w-2xl md:flex-1">
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
            {isLoading && (
              <span className="absolute right-3 text-xs text-gray-400">
                Buscando...
              </span>
            )}
          </div>

          {/* 3. Bloco de Ações da Direita (fica na 1ª linha no mobile e na ponta direita no desktop) */}
          <div className="order-2 flex shrink-0 items-center gap-3 md:order-3 md:gap-6">
            {userLogado ? (
              <div className="flex items-center gap-2 md:gap-3">
                <span className="max-w-[110px] truncate text-xs font-medium text-gray-600 sm:max-w-none md:text-sm">
                  Olá,{' '}
                  <strong className="text-gray-800 capitalize">
                    {userLogado.username}
                  </strong>
                  !
                </span>
                <button
                  onClick={() => {
                    AuthService.cleanLoggedUser();
                    window.location.reload();
                  }}
                  className="cursor-pointer text-xs font-semibold text-red-500 underline transition-colors hover:text-red-700"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold text-blue-500 transition-colors hover:text-blue-700"
              >
                Entrar
              </Link>
            )}

            <Link
              to="/shopping-cart"
              className="relative flex items-center justify-center p-1"
            >
              <CiShoppingCart className="h-8 w-8 text-gray-700 transition-colors hover:text-blue-500 md:h-9 md:w-9" />

              {totalQtd > 0 && (
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-sm">
                  <span>{totalQtd}</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
