import Card from '../components/Card';
import type { ProductProps } from '../interfaces/Product';
import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/product.service';
import { useState } from 'react';
import List from '../components/List';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import Container from '../components/Container';

const menulistVariants = tv({
  variants: {
    variant: {
      menuList: 'absolute z-10 w-48 rounded-md bg-white py-1 shadow-lg',
    },
  },
});

const Home = () => {
  const [typeFilter, setTypeFilter] = useState('');

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const listOptionsFilter = [
    {
      value: 'desc',
      name: 'Maior Preço',
      class: 'flex justify-center w-full',
    },
    {
      value: 'asc',
      name: 'Menor Preço',
      class: 'flex justify-center w-full',
    },
  ];
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['query-products', typeFilter],
    queryFn: () => ProductService.findAll(typeFilter),
  });

  if (isLoading) {
    return (
      <div className="mt-32 flex justify-center font-medium text-gray-500">
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-32 text-center text-red-500">
        Ocorreu um erro: {(error as Error).message}
      </div>
    );
  }

  const handleFilter = (value: string) => {
    setTypeFilter(value);
  };

  const handleFilterButton = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const menuListClasses = twMerge(
    menulistVariants(),
    isOpenMenu
      ? 'flex items-center flex-col absolute top-15 bg-white border rounded-md p-4 shadow-black w-44'
      : 'hidden',
  );

  return (
    <main className="mb-10 flex w-full flex-col items-center gap-6 px-4 pt-24">
      <Container>
        <div className="relative flex w-11/12 max-w-7xl flex-col items-end pb-4">
          <button
            className="text-md cursor-pointer rounded-md bg-blue-500 px-8 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
            onClick={handleFilterButton}
          >
            Filtro
          </button>
          <ul className={menuListClasses}>
            {listOptionsFilter.map((item) => {
              return (
                <List
                  key={item.name}
                  className={item.class}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilter(item.value);
                  }}
                >
                  {item.name}
                </List>
              );
            })}
          </ul>
        </div>
        {/* Grid Responsiva: 1 coluna no celular, 2 em tablets, 4 em telas grandes */}
        <div className="w-11/12 max-w-7xl">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((product: ProductProps) => (
              <Card key={product.id} item={product} />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};
export default Home;
