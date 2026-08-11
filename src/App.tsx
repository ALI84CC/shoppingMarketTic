import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './app/components/Header';
import Home from './app/view/Home';

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <Home />
        </>
      ),
    },
  ]);
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
