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


  if (isLoading) return '..loading'

   if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <div className="mt-32 flex h-4/5 w-full flex-col items-center justify-center gap-16">
      <div className="grid h-5/4 w-11/12 grid-cols-4 gap-4 overflow-x-auto">
        {products?.map((product: ProductProps) => (
          <Card key={product.id} item={product} />
        ))}
      </div>
    </div>
  );

  };
export default Home;
