import ProductCard from 'components/product-card/product-card';
import { products } from 'utils/products';

function Store() {
  return (
    <div className="store">
      {products.map((product, i) => {
        return (
          <ProductCard
            key={i}
            name={product.name}
            description={product.description}
            price={product.price}
            wasPrice={product.wasPrice}
            imageURL={product.imageURL}
          />
        );
      })}
    </div>
  );
}
export default Store;
