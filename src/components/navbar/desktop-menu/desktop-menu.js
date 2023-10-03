import { useNavigate, useLocation, Link } from 'react-router-dom';
import { isStoreSelected, isCartSelected } from 'utils/checkRoutes';
import { MainContext } from 'utils/context';
import { useContext } from 'react';
import { signOutUser } from 'utils/firebaseAuth';
import { TailSpin } from 'react-loader-spinner';
const DesktopMenu = () => {
  const { user, loading } = useContext(MainContext);
  const loc = useLocation();
  const navigate = useNavigate();

  const signOut = async () => {
    await signOutUser();
  };
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
        {loading ? (
          <TailSpin
            height="30"
            width="30"
            color="#3b4142"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : user ? (
          <button onClick={signOut} className="primary">
            Sign Out
          </button>
        ) : (
          <button onClick={() => navigate('/authenticate')} className="primary">
            Login
          </button>
        )}
      </div>
    </>
  );
};
export default DesktopMenu;
