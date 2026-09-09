import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProductProps } from '../interfaces/Product';

interface ShoppingListProviderProps {
  children: ReactNode;
}

export interface ListItem {
  id: number;
  product: ProductProps;
  unitPrice: number;
  amount: number;
  quantity: number;
}

export interface ShoppingCartListContextData {
  items: ListItem[];
  totalSumAmount: number;
  totalQtd: number;
  addProduct: (
    product: ProductProps,
    quantity?: number,
    unitPrice?: number,
    amount?: number,
  ) => void;
  onRemove: (id: number) => void;
  onDecrease: (id: number) => void;
}

const ShoppingListContext = createContext<
  ShoppingCartListContextData | undefined
>(undefined);

export const ShoppingListProvider = ({
  children,
}: ShoppingListProviderProps) => {
  const [shoppingList, setShoppingList] = useState<ListItem[]>([]);

  const addProduct = (product: ProductProps) => {
    setShoppingList((prevList: ListItem[]): ListItem[] => {
      const existingItem = prevList.find((item) => item.id === product.id);

      if (existingItem) {
        return prevList.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                amount: Number(
                  ((item.quantity + 1) * (item.product?.preco ?? 0)).toFixed(2),
                ),
              }
            : item,
        );
      }

      return [
        ...prevList,
        {
          id: product.id,
          product,
          unitPrice: product.preco,
          quantity: 1,
          amount: product.preco,
        },
      ];
    });
  };

  const onRemove = (id: number) => {
    setShoppingList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const onDecrease = (id: number) => {
    setShoppingList((prevList) => {
      const existingItem = prevList.find((item) => item.id === id);

      if (!existingItem) {
        return prevList;
      }

      if (existingItem.quantity <= 1) {
        return prevList.filter((item) => item.id !== id);
      }

      return prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              amount: (item.quantity - 1) * item.unitPrice,
            }
          : item,
      );
    });
  };

const totalSumAmount = shoppingList.reduce((acc, item) => {
  const itemAmount = item.amount ?? 0;
  return Number((acc + itemAmount).toFixed(2));
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
