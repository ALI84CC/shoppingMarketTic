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
  // totalSumAmount: number;
  // totalQtd: number;
  addProduct: (
    id: number,
    name: string,
    price: number,
    quantity: number,
    unitPrice: number,
    amount: number,
  ) => void;
  onRemove: (id: number) => void;
  onDecrease: (id: number, unitPrice: number) => void;
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
    const filteredList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(filteredList);
  };

  const clearShoppingList = (id: number, price: number) => {
    const productAlreadyInCart = shoppingList.find((item) => item.id === id);
    if (productAlreadyInCart && productAlreadyInCart?.quantity <= 1) {
      return removeFromShoppingList(id);
    }
    if (productAlreadyInCart) {
      const updatedCart = shoppingList.map((cartitem) =>
        cartitem.id === id
          ? {
              ...cartitem,
              quantity: Number(cartitem.quantity) - 1,
              amount: cartitem.amount - price,
            }
          : cartitem,
      );

      setShoppingList(updatedCart);
    }
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items: shoppingList,
        // // totalSumAmount: 0,
        // totalQtd: 0,
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
