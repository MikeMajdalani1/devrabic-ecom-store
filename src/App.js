import Store from 'pages/store';
import './App.scss';
import NavBar from 'components/navbar/navbar';
import Cart from 'pages/cart';
import Authenticate from 'pages/authenticate';
import { Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { fetchUserData } from 'utils/firebaseAuth';
import { useEffect, useState } from 'react';
import { MainContext } from 'utils/context';
import { setupDBListener } from 'utils/firebaseAuth';
import { products } from 'utils/products';

function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState();
  const [cartProducts, setCartProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchData = async () => {
    const res = await fetchUserData(user);
    if (res.success) {
      setUsername(res.data.username);
      setCartProducts(res.data.cartProducts);
    }
  };
  useEffect(() => {
    if (!loading && user) {
      setupDBListener(user, (data) => {
        const updatedProducts = products.filter((product) => {
          return !data.some((cartProduct) => cartProduct.id === product.id);
        });
        setFilteredProducts(updatedProducts);
        setCartProducts(data);
      });
    }
  }, [loading, user]);

  useEffect(() => {
    user && fetchData();
  }, [user]);

  return (
    <>
      <MainContext.Provider
        value={{
          user,
          loading,
          username,
          cartProducts,
          filteredProducts,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Store />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/authenticate" element={<Authenticate />}></Route>
        </Routes>
      </MainContext.Provider>
    </>
  );
}

export default App;
