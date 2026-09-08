import Button from '../components/Button';
import { useShoppingList } from '../contexts/ShoppingCart';

const ShoppingCart = () => {
  const { items, addProduct, onDecrease, onRemove } = useShoppingList();

  return (
    <div className="flex-colo flex h-full gap-12">
      <div className="h4/5 justify-content mt-32 flex overflow-auto">
        <div className="flex w-3/6 flex-col gap-8">
          {items.map((item) => {
            return (
              <div
                className="g-8 flex justify-between rounded-3xl bg-white"
                key={item.id}
              >
                <div className="flex gap-4 p-4">
                  <div className="flex flex-col gap-4">
                    <p>
                      <span className="text-center font-bold capitalize">
                        Produto: {item.product.nome}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">
                        Quantidade: {item.quantity}
                      </span>
                      <span className="font-bold">
                        Valor: R$ {item.unitPrice.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addProduct(item.product);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDecrease(item.id);
                      }}
                    >
                      -
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.id);
                      }}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    // <div className="fixed right-4 align-middle">
    //   {items.map((item) => (
    //     <div key={item.id} className="flex items-center gap-4 border-b p-4">
    //       <img
    //         src={item.unitPrice.toString()}
    //         alt={item.name}
    //         className="h-16 w-16 rounded object-cover"
    //       />
    //       <div>
    //         <h3 className="text-lg font-semibold">{item.name}</h3>
    //         <p className="text-gray-600">Preço: R$ {item.price}</p>
    //         <p className="text-gray-600">Quantidade: {item.quantity}</p>
    //         <p className="text-gray-600">Total: R$ {item.amount}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default ShoppingCart;
