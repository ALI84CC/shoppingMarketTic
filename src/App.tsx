import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './app/components/Header';
import Home from './app/view/Home';

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className="min-h-screen w-full bg-gray-200 pb-10 text-gray-900 antialiased">
          <Header />
          <Home />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
