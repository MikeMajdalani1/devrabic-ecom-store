import Store from 'pages/store';
import './App.scss';
import NavBar from 'components/navbar/navbar';
import Cart from 'pages/cart';
import Authenticate from 'pages/authenticate';
import { Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { fetchUserData } from 'utils/firebaseAuth';
import { useEffect } from 'react';
import { MainContext } from 'utils/context';

function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const fetchData = async () => {
    const res = await fetchUserData(user);
    if (res.success) {
      console.log(res);
    }
  };

  useEffect(() => {
    user && fetchData();
  }, [user]);

  return (
    <>
      <MainContext.Provider
        value={{
          user,
          loading,
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
