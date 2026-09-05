import { createContext, useContext, useState } from 'react';

interface ShoppingListProviderProps {
  children: React.ReactNode;
}

export interface ListItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface ShoppingCartListContextData {
  items: ListItem[];
  totalSumAmount: number;
  totalQtd: number;
  addProduct: (
    id: number,
    name: string,
    price: number,
    quantity: number,
    unitPrice: number,
    amount: number,
  ) => void;
  onRemove: (id: number) => void;
  onDecrease: (id: number) => void;
}

// constante para os valores padrão do contexto do carrinho de compras
const ShoppingListContestDefaultValues = {
  items: [],
  totalSumAmount: 0,
  totalQtd: 0,
  addProduct: () => null,
  onRemove: () => null,
  onDecrease: () => null,
};
// contexto para aplicação de carrinho de compras
const ShoppingListContext = createContext<
  ShoppingCartListContextData | undefined
  // valores por padrão do contexto do carrinho de compras
>(ShoppingListContestDefaultValues);

// estrutura para as funções do carrinho de compras, incluindo adicionar, remover e limpar itens

export const ShoppingListProvider = ({
  children,
}: ShoppingListProviderProps) => {
  // itens do carrinho de compras
  const [shoppingList, setShoppingList] = useState<ListItem[]>([]);

  const addToShoppingList = (
    id: number,
    name: string,
    price: number,
    quantity: number,
    unitPrice: number,
    amount: number,
  ) => {
    setShoppingList((prevList) => [
      ...prevList,
      { id, name, price, quantity, unitPrice, amount },
    ]);
  };

  const removeFromShoppingList = (id: number) => {
    setShoppingList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items: shoppingList,
        totalSumAmount: 0,
        totalQtd: 0,
        addProduct: addToShoppingList,
        onRemove: removeFromShoppingList,
        onDecrease: clearShoppingList,
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
