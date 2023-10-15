import Store from 'pages/store';
import './App.scss';
import NavBar from 'components/navbar/navbar';
import Cart from 'pages/cart';
import Authenticate from 'pages/authenticate';
import { Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchUserData, fetchProducts } from 'utils/firebaseFunctions';
import { useEffect, useState } from 'react';
import { MainContext } from 'utils/context';
import { setupDBListener } from 'utils/firebaseFunctions';
import { auth } from 'utils/firebaseConfig';
import AddProducts from 'pages/add-products';

function App() {
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState();
  const [cartProducts, setCartProducts] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProductsFromDB = async () => {
    const res1 = await fetchProducts();
    if (res1.success) {
      setProducts(res1.data);
    }
  };
  const fetchData = async () => {
    fetchProductsFromDB();
    if (user) {
      const res2 = await fetchUserData(user);
      if (res2.success) {
        setUsername(res2.data.username);
        setCartProducts(res2.data.cartProducts);
        setIsAdmin(res2.data.isAdmin);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    fetchProductsFromDB();
    if (!loading && user && products) {
      setupDBListener(user, (data) => {
        const updatedProducts = products.filter((product) => {
          return !data.some((cartProduct) => cartProduct.id === product.id);
        });
        setFilteredProducts(updatedProducts);
        setCartProducts(data);
      });
    } else {
    }
  }, [loading, user, products]);

  return (
    <>
      <MainContext.Provider
        value={{
          user,
          loading,
          username,
          cartProducts,
          filteredProducts,
          isAdmin,
          products,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Store />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/authenticate" element={<Authenticate />}></Route>
          <Route path="/add-products" element={<AddProducts />}></Route>
        </Routes>
      </MainContext.Provider>
    </>
  );
}

export default App;
