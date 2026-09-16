import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    /* Esta classe controla a largura idêntica para o Header e para a Home */
    <div className="mx-auto w-11/12 max-w-7xl">{children}</div>
  );
};

export default Container;
