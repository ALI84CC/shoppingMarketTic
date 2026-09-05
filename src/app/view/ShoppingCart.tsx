import { useShoppingList } from '../contexts/ShoppingCart';

const ShoppingCart = () => {
  const { items } = useShoppingList();

  return (
    <div className="fixed right-4 align-middle">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b p-4">
          <img
            src={item.unitPrice.toString()}
            alt={item.name}
            className="h-16 w-16 rounded object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">Preço: R$ {item.price}</p>
            <p className="text-gray-600">Quantidade: {item.quantity}</p>
            <p className="text-gray-600">Total: R$ {item.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
