import ProductCard from 'components/product-card/product-card';
import { MainContext } from 'utils/context';
import { useContext } from 'react';

function Store() {
  const { user, loading, filteredProducts, products } = useContext(MainContext);

  return loading ? (
    <div className="cart__message">Loading...</div>
  ) : !user ? (
    <div className="store">
      {!products || products.length === 0 ? (
        <div className="cart__message">No products are found</div>
      ) : (
        products.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })
      )}
    </div>
  ) : (
    <div className="store">
      {!filteredProducts || filteredProducts.length === 0 ? (
        <div className="cart__message">No products are found</div>
      ) : (
        filteredProducts.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })
      )}
    </div>
  );
}
export default Store;
