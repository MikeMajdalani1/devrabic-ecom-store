import CartCard from 'components/cart-card/cart-card';
import { MainContext } from 'utils/context';
import { useContext } from 'react';

function Cart() {
  const { user, loading, username, cartProducts } = useContext(MainContext);

  const calculateTotalPrice = () => {
    if (cartProducts) {
      let totalPrice = 0;

      cartProducts.forEach((element) => {
        totalPrice += Number(element.price);
      });

      return totalPrice;
    } else return 0;
  };

  return loading ? (
    <div className="cart__message">Loading...</div>
  ) : !user ? (
    <div className="cart__message">Please login to view your cart</div>
  ) : (
    <div className="cart">
      <div className="cart__products">
        {!cartProducts || cartProducts.length === 0 ? (
          <div className="cart__message cart__message--empty-cart">
            Please add products to your cart
          </div>
        ) : (
          cartProducts.map((product, i) => {
            return <CartCard key={i} product={product} />;
          })
        )}
      </div>
      <div className="cart__checkout">
        <h1>Checkout</h1>
        <h2>Username: {username} </h2>
        <h2>Total: ${calculateTotalPrice()} </h2>
        {calculateTotalPrice() !== 0 && (
          <button className="primary">Pay</button>
        )}
      </div>
    </div>
  );
}
export default Cart;
