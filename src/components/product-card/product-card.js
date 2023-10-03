import { MainContext } from 'utils/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function ProductCard({ name, description, price, wasPrice, imageURL }) {
  const { user } = useContext(MainContext);
  const navigate = useNavigate();
  const handleClick = () => {};
  const redirectToLogin = () => {
    navigate('/authenticate');
  };
  return (
    <div className="product-card">
      <div className="product-card__container">
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
      </div>
      <button
        className="product-card__btn"
        onClick={user ? handleClick : redirectToLogin}
      >
        Add to cart
      </button>
    </div>
  );
}
export default ProductCard;
