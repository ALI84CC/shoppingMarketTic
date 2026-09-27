import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './app/components/Header';
import Home from './app/view/Home';
import ShoppingCart from './app/view/ShoppingCart';
import { ShoppingListProvider } from './app/contexts/ShoppingCart';
import Login from './app/view/Login';
import SignUp from './app/view/SignUp';

// 1. O Layout Pai agora cuida APENAS do Header fixo e do Outlet das páginas comuns
const AppLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-200 pb-10 text-gray-900 antialiased">
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  const route = createBrowserRouter([
    {
      // Grupo que exibe a barra superior (Vitrine e Carrinho)
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/shopping-cart', element: <ShoppingCart /> },
      ],
    },
    {
      // Rota de Login Isolada do cabeçalho, mas agora protegida pelo Provider Global
      path: '/login',
      element: <Login />
    },
    {
      // Rota de Cadastro Isolada do cabeçalho
      path: '/register',
      element: <SignUp />
    }
  ]);

  return (
    /* 2. CORRIGIDO: O Provider agora envelopa o RouterProvider na raiz.
       Isso dá superpoderes de contexto para absolutamente TODAS as páginas! */
    <ShoppingListProvider>
      <RouterProvider router={route} />
    </ShoppingListProvider>
  );
}

export default App;
