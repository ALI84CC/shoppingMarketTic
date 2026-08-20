import Button from './Button';
import type { Product, ProductProps } from '../interfaces/Product.ts';

interface CardProps {
  product: ProductProps;
}

const Card = ({ item }: Product) => {
  return (
    <>
      <div className="flex h-96 w-64 flex-col justify-center rounded-lg bg-white p-4 shadow-md">
        <div className="flex justify-center">
          <img
            src={item.imagem}
            width={15}
            height={15}
            alt={item.nome}
            className="h-40 rounded-t-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="mb-2 flex items-center justify-center">
            <span className="text-center font-bold capitalize">
              {item.nome}
            </span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <span>{item.descricao}</span>
          </div>
          <div className="flex items-center justify-center">
            <span>R${item.preco}</span>
          </div>
        </div>
        <Button className="mt-4" variant="primary">
          Adicionar
        </Button>
      </div>
    </>
  );
};

export default Card;
