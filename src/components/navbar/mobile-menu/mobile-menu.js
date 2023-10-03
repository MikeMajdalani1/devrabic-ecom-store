import { useNavigate, useLocation, Link } from 'react-router-dom';
import { isStoreSelected, isCartSelected } from 'utils/checkRoutes';

const MobileMenu = ({ closeFn }) => {
  const loc = useLocation();
  const navigate = useNavigate();
  return (
    <div className="mobile-menu sticky">
      <nav className="mobile-menu__content">
        <div className="mobile-menu__content">
          <Link
            to="/"
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
          <button
            onClick={() => {
              navigate('/authenticate');
              closeFn();
            }}
            className="primary"
          >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};
export default MobileMenu;
