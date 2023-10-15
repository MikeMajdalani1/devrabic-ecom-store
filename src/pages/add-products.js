import { useState } from 'react';
import {
  getFrontendErrorMessage,
  handleImageChange,
  addProduct,
} from 'utils/firebaseFunctions';
import { useNavigate } from 'react-router-dom';

function AddProducts() {
  const [inputs, setInputs] = useState({
    title: '',
    price: '',
    wasPrice: '',
    description: '',
    imageURL: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const res = await addProduct(inputs);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.error);
    }
  };

  const handleFileChange = (event) => {
    handleImageChange(event)
      .then((downloadURL) => {
        setInputs({
          ...inputs,
          imageURL: downloadURL,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="add-products">
      <form onSubmit={handleAddProduct} className="form">
        <h2 className="form__title">Add a product</h2>
        <div className="form__group">
          <label className="form__label" htmlFor="title">
            Image
          </label>
          <input
            className="form__input"
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            name="image"
            required
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="title">
            Title
          </label>
          <input
            className="form__input"
            onChange={handleInputChange}
            value={inputs.title}
            type="text"
            name="title"
            required
            placeholder="Enter your title"
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="price">
            Price
          </label>
          <input
            className="form__input"
            onChange={handleInputChange}
            value={inputs.price}
            type="number"
            name="price"
            required
            placeholder="Enter your price"
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="wasPrice">
            Was Price
          </label>
          <input
            className="form__input"
            onChange={handleInputChange}
            value={inputs.wasPrice}
            type="number"
            name="wasPrice"
            required
            placeholder="Enter your 'was price'"
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form__input"
            onChange={handleInputChange}
            value={inputs.description}
            type="text"
            name="description"
            required
            rows={4}
            placeholder="Enter your description"
          />
        </div>

        {error && (
          <div className="form__group">
            <p className="form__error">{error}</p>
          </div>
        )}
        <button className="form__button primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
export default AddProducts;
