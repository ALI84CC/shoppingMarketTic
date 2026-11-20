import Button from './Button';
import type { ProductProps } from '../interfaces/Product.ts';
import { useShoppingList } from '../contexts/ShoppingCart.tsx';

interface CardProps {
  item: ProductProps;
}

const Card = ({ item }: CardProps) => {
  const { addProduct } = useShoppingList();

  const precoFormatado = Number(item.preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="group flex w-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* 1. Moldura padronizada: sempre terá 160px (h-40) de altura, independente da API */}
      <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-4">
        <img
          src={item.imagem}
          alt={item.nome}
          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* 2. Área de Textos padronizada */}
      <div className="mt-3 flex flex-1 flex-col text-left">
        <h3
          title={item.nome}
          className="truncate text-sm font-bold !text-gray-800 capitalize"
        >
          {item.nome.replaceAll('-', ' ')}
        </h3>

        {/* Altura fixa de 2 linhas (h-8 ou h-9) para alinhar todos os preços */}
        <p className="mt-1 line-clamp-2 h-8 text-xs leading-relaxed !text-gray-500">
          {item.descricao}
        </p>

        <div className="mt-3 text-base font-extrabold !text-gray-900">
          {precoFormatado}
        </div>
      </div>

      {/* 3. Botão sempre na base */}
      <Button
        className="mt-3 w-full py-2 text-xs font-semibold tracking-wide"
        variant="primary"
        onClick={() => addProduct(item)}
      >
        Adicionar ao carrinho
      </Button>
    </div>
  );
};

export default Card;
