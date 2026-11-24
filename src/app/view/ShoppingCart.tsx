import { useEffect } from 'react';
import Button from '../components/Button';
import { useShoppingList } from '../contexts/ShoppingCart';
import { isNull } from 'lodash';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';

const ShoppingCart = () => {
  const { items, addProduct, onDecrease, onRemove } = useShoppingList();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNull(AuthService.getLoggedUser())) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <main className="w-full">
        <Container>
          <div className="rounded-lg bg-white p-6 shadow-md">
            {/* Container que centraliza o conteúdo e gerencia o scroll */}
            <div className="mt-32 flex flex-1 justify-center overflow-auto px-4">
              {/* Aumentado a largura máxima (max-w-3xl) e w-full para os cards ficarem largos e centralizados */}
              <div className="flex w-full max-w-3xl flex-col gap-6">
                {items.map((item) => {
                  return (
                    <div
                      className="flex w-full items-center justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
                      key={item.id}
                    >
                      {/* Ajustado flex para ocupar o espaço todo do card de forma organizada */}
                      <div className="flex w-full items-center justify-between gap-6">
                        {/* Informações do Produto */}
                        <div className="flex flex-col gap-3">
                          <p>
                            <span className="text-base font-bold text-gray-800 capitalize">
                              Produto: {item.product?.nome}
                            </span>
                          </p>

                          <div className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-500">
                              Quantidade:
                            </span>{' '}
                            <span className="rounded bg-blue-50 px-2 py-0.5 font-bold text-blue-600">
                              {item.quantity}
                            </span>
                          </div>

                          <div className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-500">
                              Total do item:
                            </span>{' '}
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
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-4 shadow">
              <span className="font-bold">
                Total da compra: <span className="text-green-600">R$ {''}</span>
              </span>
              <button className="rounded-lg bg-green-500 px-6 py-2.5 font-medium text-white hover:bg-green-600">
                Finalizar Compra
              </button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default ShoppingCart;
