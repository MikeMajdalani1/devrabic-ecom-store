import { MainContext } from 'utils/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateArrayData } from 'utils/firebaseAuth';
function ProductCard({ product }) {
  const { imageURL, name, wasPrice, description, price } = product;
  const { user } = useContext(MainContext);
  const navigate = useNavigate();
  const addProduct = async () => {
    await updateArrayData(product);
  };
  const redirectToLogin = () => {
    navigate('/authenticate');
  };
  return (
    <div className="product-card">
      <div className="product-card__content">
        <img
          className="product-card__content__image"
          alt={name}
          src={imageURL}
        ></img>
        <span className="product-card__content__title"> {name}</span>
        <div className="product-card__content__price">
          {price}{' '}
          {wasPrice && (
            <span className="product-card__content__price__slash">
              {wasPrice}
            </span>
          )}
        </div>
        <span className="product-card__content__description">
          {description}
        </span>
      </div>
      <button
        className="product-card__btn"
        onClick={user ? addProduct : redirectToLogin}
      >
        Add to cart
      </button>
    </div>
  );
}
export default ProductCard;
