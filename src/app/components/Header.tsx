import Input from './Input';
import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/product.service';
import { CiShoppingCart } from "react-icons/ci";
import type { ProductProps } from '../interfaces/Product';
import { useMemo, useState, useEffect, type ChangeEvent, useRef } from 'react';
import { debounce, isNull } from 'lodash';
import List from './List';
import Container from './Container';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { Link} from 'react-router-dom';
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
    const session = AuthService.getLoggedUser();
    if (session && session.user) {
      setUserLogado(session.user);
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
    <header className="fixed top-0 right-0 z-50 flex h-20 w-full items-center justify-center border-b border-gray-500 bg-white py-4 shadow-md">
      <Container>
        <div className="mx-auto flex w-11/12 items-center justify-between gap-8">

          {/* 1. Bloco da Logo */}
          <div className="w-32 shrink-0">
            <Link to="/">
              <img
                src="./assets/shopping-market-tic.png"
                alt="Logo"
                className="h-auto w-16 object-contain"
              />
            </Link>
          </div>

          {/* 2. Bloco da Barra de Busca */}
          <div className="relative flex max-w-2xl flex-1 items-center">
            <Input value={inputValue} onChange={handleInput} />
            {isOpen && searchTerm.trim() !== '' && productByName && Array.isArray(productByName) && productByName.length > 0 && (
              <ul
                ref={refDropDown}
                className="absolute top-full right-0 left-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-xl"
              >
                {productByName.map((product: ProductProps) => (
                  <List
                    key={product.id}
                    className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">{product.nome}</span>
                    <div className="flex items-center gap-3">
                      <img src={product.imagem} className="h-10 w-10 rounded object-cover" alt={product.nome} />
                      <span className="text-sm font-semibold text-green-600">R$ {product.preco}</span>
                    </div>
                  </List>
                ))}
              </ul>
            )}
            {isLoading && <span className="absolute right-3 text-xs text-gray-400">Buscando...</span>}
          </div>

          {/* 3. Bloco de Ações da Direita (Boas-vindas, Carrinho e Login/Logout) */}
          <div className="flex items-center gap-6 shrink-0">

            {/* Mensagem de Boas-Vindas ou Link para Login */}
            {userLogado ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">
                  Olá, <strong className="capitalize text-gray-800">{userLogado.username}</strong>!
                </span>
                <button
                  onClick={() => {
                    AuthService.cleanLoggedUser(); // Limpa totalmente o localStorage
                    window.location.reload();      // Recarrega a página de forma limpa
                  }}
                  className="cursor-pointer text-xs font-semibold text-red-500 hover:text-red-700 transition-colors underline"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors"
              >
                Entrar
              </Link>
            )}

            {/* Ícone do Carrinho com o Contador flutuando perfeitamente por cima */}
            <Link to="/shopping-cart" className="relative flex items-center justify-center p-1">
              <CiShoppingCart className="h-9 w-9 text-gray-700 hover:text-blue-500 transition-colors" />

              {totalQtd > 0 && (
                // O uso de 'absolute' faz a bolinha azul ficar cravada no canto superior direito do ícone
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
