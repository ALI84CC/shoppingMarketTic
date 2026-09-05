import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './app/view/Home';
import Layout from './app/components/Layout';
import ShoppingCart from './app/view/ShoppingCart';
import { ShoppingListProvider } from './app/contexts/ShoppingCart';

function App() {
  const route = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/shopping-cart', element: <ShoppingCart /> },
      ],
    },
  ]);

  return (
    <ShoppingListProvider>
      <RouterProvider router={route} />
    </ShoppingListProvider>
  );
}

export default App;
