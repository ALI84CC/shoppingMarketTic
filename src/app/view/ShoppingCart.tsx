import { useEffect } from 'react';
import Button from '../components/Button';
import { useShoppingList } from '../contexts/ShoppingCart';
import { isNull } from 'lodash';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';

const ShoppingCart = () => {
  const {
    items,
    addProduct,
    onDecrease,
    onRemove,
    totalSumAmount,
    isOrderCompleted,
    lastOrderTotal,
    finishOrder,
    resetOrder,
  } = useShoppingList();

  const navigate = useNavigate();

  useEffect(() => {
    if (isNull(AuthService.getLoggedUser())) {
      navigate('/login');
    }
  }, [navigate]);

  const handleContinueShopping = () => {
    resetOrder();
    navigate('/'); // Ajuste para a rota da sua vitrine/home, se necessário
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center pt-20">
      <Container>
        <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-md">
          {/* 1. EXIBE O CARD DE COMPRA CONCLUÍDA */}
          {isOrderCompleted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="mb-2 text-2xl font-bold text-gray-800">
                Compra concluída com sucesso!
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Obrigado pela sua compra. Seu pedido já foi registrado.
              </p>

              <div className="mb-6 w-full max-w-xs rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="block text-xs font-semibold text-gray-400 uppercase">
                  Valor Total Pago
                </span>
                <span className="text-2xl font-extrabold text-green-600">
                  R$ {Number(lastOrderTotal).toFixed(2)}
                </span>
              </div>

              <Button onClick={handleContinueShopping}>
                Continuar Comprando
              </Button>
            </div>
          ) : items.length === 0 ? (
            /* 2. EXIBE MENSAGEM SE O CARRINHO ESTIVER VAZIO */
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="mb-4 text-lg font-semibold text-gray-600">
                Seu carrinho está vazio.
              </p>
              <Button onClick={() => navigate('/')}>Ver Produtos</Button>
            </div>
          ) : (
            /* 3. EXIBE A LISTA DE PRODUTOS E O RESUMO PARA FECHAR COMPRA */
            <>
              <div className="flex max-h-[60vh] flex-1 justify-center overflow-auto px-2">
                <div className="flex w-full flex-col gap-4">
                  {items.map((item) => (
                    <div
                      className="flex w-full items-center justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
                      key={item.id}
                    >
                      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        {/* Informações do Produto */}
                        <div className="flex flex-col gap-2">
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

                        {/* Botões de Ação */}
                        <div className="flex items-center gap-2">
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
                  ))}
                </div>
              </div>

              {/* Barra Inferior com Total e Botão Finalizar */}
              <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
                <span className="font-bold text-gray-800">
                  Total da compra:{' '}
                  <span className="text-lg text-green-600">
                    R$ {Number(totalSumAmount).toFixed(2)}
                  </span>
                </span>
                <button
                  onClick={finishOrder}
                  className="cursor-pointer rounded-lg bg-green-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-green-600"
                >
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      </Container>
    </main>
  );
};

export default ShoppingCart;
