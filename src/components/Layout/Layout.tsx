import { Header } from './components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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
