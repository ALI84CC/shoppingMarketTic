
import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/product.service';

import type { ProductProps } from '../interfaces/Product';
import { useMemo, useState, useEffect, type ChangeEvent, useRef } from 'react';
import { debounce } from 'lodash';
import { useOnClickOutside } from '../hooks/useClickOutside';
import { Link } from 'react-router-dom';
import { useShoppingList } from '../contexts/ShoppingCart';
import AuthService from '../services/auth.service';
import Input from '../components/Input';
import Container from '../components/Container';
import Button from '../components/Button';

const Header = () => {
  const { totalQtd } = useShoppingList();
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userLogado, setUserLogado] = useState<any>(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const refDropDown = useRef<HTMLUListElement>(null!);

  const { data: productByName } = useQuery<ProductProps[], Error>({
    queryKey: ['query-products-by-name', searchTerm],
    queryFn: () => ProductService.searchName(searchTerm),
    enabled: !!searchTerm.trim(),
  });

  useEffect(() => {
    if (productByName) {
      setIsOpen(productByName.length > 0);
    }
  }, [productByName]);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 500),
    [],
  );

  // Busca segura do usuário logado
  useEffect(() => {
    const session = AuthService.getLoggedUser();
    if (session && session.user) {
      setUserLogado(session.user);
    } else {
      setUserLogado(null);
    }
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useOnClickOutside(refDropDown, () => {
    setIsOpen(false);
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // TODO: Implement login logic
  }

  return (
  /* pt-24 garante que o card de login fique abaixo do cabeçalho global fixo sem sumir */
  <div className="w-full pt-24 flex justify-center items-center">
    <Container>
      {/* O card branco centralizado com o formulário real */}
      <div  className="mx-auto max-w-sm w-full bg-white p-8 rounded-2xl shadow-md flex flex-col gap-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />

          <Button type="submit" className="mt-2 w-full">
            Entrar
          </Button>
        </form>
        <div className="text-xs text-gray-500 mt-2">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Cadastre-se aqui
          </Link>
        </div>
      </div>
    </Container>
  </div>
);

};

export default Header;
