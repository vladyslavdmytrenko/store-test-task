import { ROUTER_URL_LIST } from '@/constant';
import { Link } from 'react-router-dom';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light px-2'>
      <Link className='navbar-brand' to={ROUTER_URL_LIST.PRODUCT_OVERVIEW}>
        Store
      </Link>
    </nav>
  );
};
