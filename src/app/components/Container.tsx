import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    /* Esta classe controla a largura idêntica para o Header e para a Home */
    <div className="mx-auto flex w-11/12 max-w-7xl flex-col items-center pt-3">
      {children}
    </div>
  );
};

export default Container;
