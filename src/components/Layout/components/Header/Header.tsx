import { Link, NavLink } from 'react-router-dom';
import { FC } from 'react';

import { ROUTER_URL_LIST } from '@/constant';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light px-2'>
      <Link className='navbar-brand' to={ROUTER_URL_LIST.PRODUCT_OVERVIEW}>
        Store
      </Link>

      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <div className='navbar-nav'>
          <NavLink
            to={ROUTER_URL_LIST.PRODUCT_OVERVIEW}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Overview
          </NavLink>

          <NavLink
            to={ROUTER_URL_LIST.PRODUCT_CREATE}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Create
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
