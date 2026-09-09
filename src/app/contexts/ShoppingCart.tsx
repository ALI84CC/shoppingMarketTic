import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProductProps } from '../interfaces/Product';

interface ShoppingListProviderProps {
  children: ReactNode;
}

// 1. Interface alinhada com o banco de dados
export interface ListItem {
  id: number;
  product: ProductProps; // Guarda o produto completo vindo do db.json
  quantity: number; // Quantidade no carrinho
  amount: number; // Valor total deste item (quantidade * preco)
}

export interface ShoppingCartListContextData {
  items: ListItem[];
  totalSumAmount: number;
  totalQtd: number;
  addProduct: (product: ProductProps) => void;
  onRemove: (id: number) => void;
  onDecrease: (id: number) => void;
}

const ShoppingListContext = createContext<ShoppingCartListContextData | undefined>(undefined);

export const ShoppingListProvider = ({
  children,
}: ShoppingListProviderProps) => {
  const [shoppingList, setShoppingList] = useState<ListItem[]>([]);

  // 1. ADICIONAR PRODUTO (Sem loops complexos ou variáveis quebradas)
  const addProduct = (product: ProductProps) => {
    setShoppingList((prevList) => {
      // Procura se o produto já existe no carrinho
      const existingItem = prevList.find(
        (item) => Number(item.id) === Number(product.id),
      );

      if (existingItem) {
        // Se existe, mapeia a lista aumentando a quantidade e recalculando o valor total
        return prevList.map((item) => {
          if (Number(item.id) === Number(product.id)) {
            const nextQuantity = item.quantity + 1;
            return {
              ...item,
              quantity: nextQuantity,
              amount: Number((nextQuantity * product.preco).toFixed(2)), // Usa o preço direto do produto enviado
            };
          }
          return item;
        });
      }

      const valorPreco = product?.preco ?? 0;

      // Se o produto é novo, adiciona ele no array com a estrutura correta
      return [
        ...prevList,
        {
          id: product.id,
          product: product,
          quantity: 1,
          amount: Number(valorPreco.toFixed(2)),
        },
      ];
    });
  };

  // 2. REMOVER PRODUTO TOTALMENTE
  const onRemove = (id: number) => {
    setShoppingList((prevList) =>
      prevList.filter((item) => Number(item.id) !== Number(id)),
    );
  };

  // 3. DIMINUIR QUANTIDADE
  const onDecrease = (id: number) => {
    setShoppingList((prevList) => {
      const existingItem = prevList.find(
        (item) => Number(item.id) === Number(id),
      );

      if (!existingItem) return prevList;

      // Se só tem 1 unidade, remove do carrinho
      if (existingItem.quantity <= 1) {
        return prevList.filter((item) => Number(item.id) !== Number(id));
      }

      // Se tem mais de 1, diminui a quantidade
      return prevList.map((item) => {
        if (Number(item.id) === Number(id)) {
          const nextQuantity = item.quantity - 1;
          return {
            ...item,
            quantity: nextQuantity,
            amount: Number((nextQuantity * item.product.preco).toFixed(2)),
          };
        }
        return item;
      });
    });
  };

  // 4. CÁLCULO DOS TOTAIS DO CABEÇALHO/CARRINHO
  const totalSumAmount = shoppingList.reduce((acc, item) => {
    const qtdItem = item.quantity ?? 0;
    return acc + qtdItem * item.product.preco;
  }, 0);

  const totalQtd = shoppingList.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShoppingListContext.Provider
      value={{
        items: shoppingList,
        totalSumAmount,
        totalQtd,
        addProduct,
        onRemove,
        onDecrease,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = (): ShoppingCartListContextData => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      'useShoppingList must be used within a ShoppingListProvider',
    );
  }
  return context;
};
