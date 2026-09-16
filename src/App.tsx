import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './app/components/Header';
import Home from './app/view/Home';
import ShoppingCart from './app/view/ShoppingCart';
import { ShoppingListProvider } from './app/contexts/ShoppingCart';
import Login from './app/view/Login';

import SignUp from './app/view/SignUp';

// 1. Criamos um componente de Layout que envelopa a aplicação inteira no Provider
const AppLayout = () => {
  return (
    <ShoppingListProvider>
      <div className="min-h-screen w-full bg-gray-200 pb-10 text-gray-900 antialiased">
        <Header />
        {/* O Outlet serve para renderizar a página filha (Home ou ShoppingCart) aqui dentro */}
        <Outlet />
      </div>
    </ShoppingListProvider>
  );
};

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />, // O Layout Pai protege tudo
      children: [
        {
          path:"/login",
          element:<Login />
        },
         {
          path:"/register",
          element:<SignUp />
        },
        {
          path: '/', // Rota da Página Inicial
          element: <Home />,
        },
        {
          path: '/shopping-cart', // Rota da Página do Carrinho
          element: <ShoppingCart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
