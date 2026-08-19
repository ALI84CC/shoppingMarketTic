import { useEffect } from 'react';
import Card from '../components/Card';
import findAll from '../services/product.service';
import type { ProductProps } from '../interfaces/Product';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  // useEffect(() => {
  //   findAll().then((res) => console.log(res));
  // }, []);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<ProductProps[], Error>({
    queryKey: ['query-products'],
    queryFn: async () => {
      const response = await findAll();
      return response;
    },
  });

  return (
    <>
      {products?.map((product: ProductProps) => (
        <Card key={product.id} product={product} />
      ))}
    </>
  );
};
export default Home;
