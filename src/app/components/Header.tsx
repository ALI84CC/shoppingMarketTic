import Input from './Input';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 flex w-full items-center justify-center bg-white py-3">
      <div className="mx-auto flex w-11/12 items-center justify-between gap-52">
        <div>
          <a href="/">
            <img
              src="./assets/shopping-market-tic.png"
              alt="Logo"
              className="max-w-15"
            />
          </a>
        </div>
        <div className="w-4/5">
          <Input />
        </div>
        <div className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Carrinho
        </div>
      </div>
    </header>
  );
};

export default Header;
