import Card from '../components/Card';
import type { ProductProps } from '../interfaces/Product';
import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/product.service';

const Home = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['query-products'],
    queryFn: () => ProductService.findAll(),
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

  return (
    <main className="mt-28 mb-10 flex w-full justify-center">
      {/* Grid Responsiva: 1 coluna no celular, 2 em tablets, 4 em telas grandes */}
      <div className="grid w-11/12 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product: ProductProps) => (
          <Card key={product.id} item={product} />
        ))}
      </div>
    </main>
  );
};
export default Home;
