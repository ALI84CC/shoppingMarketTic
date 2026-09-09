import Button from './Button';
import type { ProductProps } from '../interfaces/Product.ts';
import { useShoppingList } from '../contexts/ShoppingCart.tsx';

interface CardProps {
  item: ProductProps;
}

const Card = ({ item }: CardProps) => {
  const { addProduct } = useShoppingList();

  return (
    <div className="flex h-[300px] w-full max-w-[220px] flex-col justify-between rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">

      {/* 1. Área da Imagem (Tamanho controlado para não empurrar o resto) */}
      <div className="flex h-24 w-full items-center justify-center">
        <img
          src={item.imagem}
          alt={item.nome}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* 2. Área de Textos e Preço (Sem preenchimentos extras que estouram o card) */}
      <div className="mt-2 flex flex-1 flex-col justify-between text-center">
        <div>
          <h3 className="text-sm font-bold text-gray-800 capitalize leading-tight truncate">
            {item.nome}
          </h3>
          {/* O line-clamp-2 agora funciona perfeitamente pois a div não é flex */}
          <p className="mt-1 line-clamp-2 text-xs text-gray-500 px-1">
            {item.descricao}
          </p>
        </div>

        <div className="my-1 text-sm font-semibold text-gray-700">
          R$ {item.preco}
        </div>
      </div>

      {/* 3. Botão sempre visível na base e com chamada de função corrigida */}
      <Button
        className="mt-auto w-full text-xs py-2"
        variant="primary"
        onClick={() => addProduct(item)} // Passa o objeto completo unificado!
      >
        Adicionar
      </Button>
    </div>
  );
};

export default Card;
