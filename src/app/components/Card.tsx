import Button from './Button';
import type { ProductProps } from '../interfaces/Product.ts';

interface CardProps {
  product: ProductProps;
}

const Card = ({ product }: CardProps) => {
  return (
    <>
      <div className="w-55 rounded-lg bg-white p-4 shadow-md">
        <div>
          <img
            src={product.imagem}
            width={20}
            height={20}
            alt={product.nome}
            className="h-auto w-full"
          />
        </div>
        <div className="mb-2 flex items-center justify-center">
          <h3>{product.nome}</h3>
        </div>
        <div className="flex items-center justify-center text-gray-600">
          <span>{product.descricao}</span>
        </div>
        <Button className="mt-4" variant="primary">
          Adicionar
        </Button>
      </div>
    </>
  );
};

export default Card;
