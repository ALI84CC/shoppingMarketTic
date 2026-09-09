import Button from '../components/Button';
import { useShoppingList } from '../contexts/ShoppingCart';

const ShoppingCart = () => {
  const { items, addProduct, onDecrease, onRemove, totalSumAmount } = useShoppingList();

  return (
    // Removido flex-colo incorreto e estruturado o container principal com padding inferior para o total fixo
    <div className="flex flex-col w-full h-screen pb-24 bg-gray-50">

      {/* Container que centraliza o conteúdo e gerencia o scroll */}
      <div className="flex-1 mt-32 flex justify-center overflow-auto px-4">

        {/* Aumentado a largura máxima (max-w-3xl) e w-full para os cards ficarem largos e centralizados */}
        <div className="flex w-full max-w-3xl flex-col gap-6">
          {items.map((item) => {
            return (
              <div
                className="p-6 flex justify-between items-center rounded-3xl bg-white shadow-sm border border-gray-100 w-full"
                key={item.id}
              >
                {/* Ajustado flex para ocupar o espaço todo do card de forma organizada */}
                <div className="flex justify-between items-center w-full gap-6">

                  {/* Informações do Produto */}
                  <div className="flex flex-col gap-3">
                    <p>
                      <span className="text-gray-800 font-bold capitalize text-base">
                        Produto: {item.product?.nome}
                      </span>
                    </p>

                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-500">Quantidade:</span>{' '}
                      <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-500">Total do item:</span>{' '}
                      <span className="font-bold text-green-600">
                        R$ {Number(item.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Botões de Ação alinhados horizontalmente para não esticar o card verticalmente */}
                  <div className="flex items-center gap-3">
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

      {/* Barra Inferior Fixa posicionando o Total estritamente no canto inferior esquerdo */}
      <div className="fixed bottom-0 left-0 p-8 bg-white/80 backdrop-blur-md w-full border-t border-gray-200 flex justify-start">
        <span className="text-xl text-gray-800">
          <span className="font-medium text-gray-500">Total da compra:</span>{' '}
          <strong className="text-green-600 font-bold">R$ {totalSumAmount.toFixed(2)}</strong>
        </span>
      </div>

    </div>
  );
};

export default ShoppingCart;
