import { FC, ReactNode } from 'react';

import { Header } from './components/Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <Header />
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-12'>{children}</div>
      </div>
    </div>
  );
};
