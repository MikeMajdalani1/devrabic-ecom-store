import { useNavigate, useLocation, Link } from 'react-router-dom';
import { isStoreSelected, isCartSelected } from 'utils/checkRoutes';
import { signOutUser } from 'utils/firebaseFunctions';
import { MainContext } from 'utils/context';
import { useContext } from 'react';

const MobileMenu = ({ closeFn }) => {
  const { user, cartProducts } = useContext(MainContext);

  const loc = useLocation();
  const navigate = useNavigate();
  const signOut = async () => {
    await signOutUser();
  };
  return (
    <div className="mobile-menu">
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

        <div className="mobile-menu__content mobile-menu__content--cart">
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
          {user && cartProducts && (
            <div className="mobile-menu__content__cart-count">
              {cartProducts.length}
            </div>
          )}
        </div>
        {user ? (
          <button onClick={signOut} className="primary">
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => {
              navigate('/authenticate');
              closeFn();
            }}
            className="primary"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
export default MobileMenu;
