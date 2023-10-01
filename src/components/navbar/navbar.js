import { useState, useEffect } from 'react';
import useWindowSize from 'utils/useWindowSize';
import DesktopMenu from './desktop-menu/desktop-menu';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import MobileMenu from './mobile-menu/mobile-menu';
function NavBar() {
  const { width } = useWindowSize();
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const closeMenu = () => {
    setMenuIsOpened(false);
  };
  const openMenu = () => {
    setMenuIsOpened(true);
  };

  useEffect(() => {
    if (width > 800) {
      closeMenu(false);
    }
  }, [width]);

  return (
    <div>
      <div className="navbar sticky">
        <div className="navbar__left-side">
          <Link to="/">
            <div className="navbar__left-side__logo">
              <span className="navbar__left-side__logo__text">
                DEVRABIC <b>ECOM</b> STORE
              </span>
            </div>
          </Link>
        </div>

        <div className="navbar__right-side">
          {width < 800 ? (
            menuIsOpened ? (
              <AiOutlineClose
                className="navbar__right-side__icon"
                onClick={closeMenu}
              ></AiOutlineClose>
            ) : (
              <RxHamburgerMenu
                className="navbar__right-side__icon"
                onClick={openMenu}
              ></RxHamburgerMenu>
            )
          ) : (
            <DesktopMenu />
          )}
        </div>
      </div>
      {menuIsOpened && <MobileMenu closeFn={closeMenu} />}
    </div>
  );
}
export default NavBar;
