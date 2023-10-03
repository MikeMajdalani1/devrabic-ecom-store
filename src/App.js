import Store from 'pages/store';
import './App.scss';
import NavBar from 'components/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from 'pages/cart';
import Authenticate from 'pages/authenticate';

function App() {
  return (
    <>
      <NavBar />{' '}
      <Routes>
        <Route path="/" element={<Store />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/authenticate" element={<Authenticate />}></Route>
      </Routes>
    </>
  );
}

export default App;
