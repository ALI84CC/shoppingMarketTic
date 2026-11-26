import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProductProps } from '../interfaces/Product';

interface ShoppingListProviderProps {
  children: ReactNode;
}

export interface ListItem {
  id: number;
  product: ProductProps;
  quantity: number;
  amount: number;
}

export interface ShoppingCartListContextData {
  items: ListItem[];
  totalSumAmount: number;
  totalQtd: number;
  isOrderCompleted: boolean;
  lastOrderTotal: number;
  addProduct: (product: ProductProps) => void;
  onRemove: (id: number) => void;
  onDecrease: (id: number) => void;
  cleanCart: () => void;
  finishOrder: () => void;
  resetOrder: () => void;
}

const ShoppingListContext = createContext<
  ShoppingCartListContextData | undefined
>(undefined);

export const ShoppingListProvider = ({
  children,
}: ShoppingListProviderProps) => {
  const [shoppingList, setShoppingList] = useState<ListItem[]>([]);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [lastOrderTotal, setLastOrderTotal] = useState(0);

  // 1. ADICIONAR PRODUTO
  const addProduct = (product: ProductProps) => {
    setIsOrderCompleted(false); // Garante que o estado de compra concluída resete se voltar a comprar

    setShoppingList((prevList) => {
      const existingItem = prevList.find(
        (item) => Number(item.id) === Number(product.id),
      );

      if (existingItem) {
        return prevList.map((item) => {
          if (Number(item.id) === Number(product.id)) {
            const nextQuantity = item.quantity + 1;
            return {
              ...item,
              quantity: nextQuantity,
              amount: Number((nextQuantity * product.preco).toFixed(2)),
            };
          }
          return item;
        });
      }

      const valorPreco = product?.preco ?? 0;

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

      if (existingItem.quantity <= 1) {
        return prevList.filter((item) => Number(item.id) !== Number(id));
      }

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

  const totalSumAmount = shoppingList.reduce((acc, item) => {
    const itemAmount = item.amount ?? 0;
    return Number((acc + itemAmount).toFixed(2));
  }, 0);

  const totalQtd = shoppingList.reduce((acc, item) => acc + item.quantity, 0);

  // 4. LIMPAR CARRINHO
  const cleanCart = () => {
    setShoppingList([]);
  };

  // 5. FINALIZAR COMPRA
  const finishOrder = () => {
    if (totalQtd === 0) return;
    setLastOrderTotal(totalSumAmount); // Salva o valor antes de limpar o carrinho
    setIsOrderCompleted(true);
    cleanCart();
  };

  // 6. RESETAR ESTADO DO CARD DE SUCESSO
  const resetOrder = () => {
    setIsOrderCompleted(false);
    setLastOrderTotal(0);
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items: shoppingList,
        totalSumAmount,
        totalQtd,
        isOrderCompleted,
        lastOrderTotal,
        addProduct,
        onRemove,
        onDecrease,
        cleanCart,
        finishOrder,
        resetOrder,
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
