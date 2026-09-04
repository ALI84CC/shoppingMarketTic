import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './app/view/Home';
import Layout from './app/components/Layout';
import ShoppingCart from './app/view/ShoppingCart';

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

  return <RouterProvider router={route} />;
}

export default App;
