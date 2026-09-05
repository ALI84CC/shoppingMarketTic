import Button from './Button';
import type { ProductProps } from '../interfaces/Product.ts';
import { useShoppingList } from '../contexts/ShoppingCart.tsx';

interface CardProps {
  item: ProductProps;
}

const Card = ({ item }: CardProps) => {
  const { addProduct } = useShoppingList();

  return (
    <>
      <div className="flex h-[300px] w-full max-w-[220px] flex-col rounded-lg bg-white p-4 py-4 shadow-md transition-shadow hover:shadow-lg">
        <div className="flex justify-center">
          <img
            src={item.imagem}
            alt={item.nome}
            className="h-32 w-32 rounded-t-lg object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="mb-2 flex flex-col items-center justify-center gap-2 align-middle">
            <span className="text-center font-bold capitalize">
              {item.nome}
            </span>
            <div className="line-clamp-2 flex items-center justify-center text-gray-600">
              <span>{item.descricao}</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span>R$ {item.preco}</span>
          </div>
        </div>

        <Button
          className="mt-auto w-full"
          variant="primary"
          onClick={() =>
            addProduct(
              Number(item.id),
              item.nome,
              Number(item.descricao),
              item.preco,
              Number(item.imagem),
              1,
            )
          }
        >
          Adicionar
        </Button>
      </div>
    </>
  );
};

export default Card;
