import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { isStoreSelected, isCartSelected } from 'utils/checkRoutes';
const DesktopMenu = () => {
  const loc = useLocation();

  return (
    <>
      <Link
        to="/"
        className={` navbar__right-side__item ${
          isStoreSelected(loc.pathname)
            ? 'navbar__right-side__item--selected'
            : ''
        }`}
      >
        <p>Store</p>
      </Link>

      <Link
        to="/cart"
        className={` navbar__right-side__item ${
          isCartSelected(loc.pathname)
            ? 'navbar__right-side__item--selected'
            : ''
        }`}
      >
        <p>Cart</p>
      </Link>

      <div className="navbar__right-side__btn">
        <button className="primary">Login</button>
      </div>
    </>
  );
};
export default DesktopMenu;
