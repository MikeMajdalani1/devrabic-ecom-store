import { useNavigate, useLocation, Link } from 'react-router-dom';
import { isStoreSelected, isCartSelected } from 'utils/checkRoutes';
import { signOutUser } from 'utils/firebaseAuth';
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
          <div className=" mobile-menu__content__item">
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
        </div>
        <div className="mobile-menu__content">
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
      </nav>
    </div>
  );
};
export default MobileMenu;
