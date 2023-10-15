import { AiFillDelete } from 'react-icons/ai';
import { deleteArrayData } from 'utils/firebaseFunctions';

function CartCard({ product }) {
  const { imageURL, title, description, price } = product;
  const removeProduct = async () => {
    await deleteArrayData(product);
  };
  return (
    <div className="cart-card">
      <img src={imageURL} alt={title} className="cart-card__image"></img>
      <span className="cart-card__name"> {title}</span>
      <span className="cart-card__description"> {description}</span>
      <span>
        {' '}
        <b>$</b>
        {price}
      </span>
      <AiFillDelete onClick={removeProduct} className="cart-card__icon" />
    </div>
  );
}
export default CartCard;
