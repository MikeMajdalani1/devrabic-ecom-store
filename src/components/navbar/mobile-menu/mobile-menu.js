import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { isStoreSelected, isCartSelected } from 'utils/checkRoutes';

const MobileMenu = ({ closeFn }) => {
  const loc = useLocation();

  return (
    <div className="mobile-menu sticky">
      <nav className="mobile-menu__content">
        <div className="mobile-menu__content">
          <Link
            to="/store"
            onClick={closeFn}
            className={` mobile-menu__content__item ${
              isStoreSelected(loc.pathname)
                ? 'mobile-menu__content__item--selected'
                : ''
            }`}
          >
            <p>Store</p>
          </Link>
          <Link
            to="/cart"
            onClick={closeFn}
            className={` mobile-menu__content__item ${
              isCartSelected(loc.pathname)
                ? 'mobile-menu__content__item--selected'
                : ''
            }`}
          >
            <p>Cart</p>
          </Link>
        </div>
        <div className="mobile-menu__content">
          <button className="primary">Login</button>
        </div>
      </nav>
    </div>
  );
};
export default MobileMenu;
