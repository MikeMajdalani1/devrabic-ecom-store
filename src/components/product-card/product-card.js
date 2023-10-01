function ProductCard({ name, description, price, wasPrice, imageURL }) {
  const handleClick = () => {};

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
      <button className="product-card__btn" onClick={handleClick}>
        Add to cart
      </button>
    </div>
  );
}
export default ProductCard;
