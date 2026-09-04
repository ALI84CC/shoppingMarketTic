import { Suspense } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main className=" flex min-h-screen w-full flex-col items-center justify-center bg-gray-200 text-gray-900 antialiased">
        <Suspense fallback={'loading...'}>
          <Outlet></Outlet>
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
