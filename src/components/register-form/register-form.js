import { useState } from 'react';
import { registerUser, getFrontendErrorMessage } from 'utils/firebaseFunctions';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await registerUser(
      inputs.username,
      inputs.email,
      inputs.password
    );
    if (res.success) {
      navigate('/');
    } else {
      setError(getFrontendErrorMessage(res.error));
    }
  };

  return (
    <form onSubmit={handleRegister} className="form">
      <h2 className="form__title">Create an account</h2>
      <div className="form__group">
        <label className="form__label" htmlFor="username">
          Username
        </label>
        <input
          className="form__input"
          onChange={handleInputChange}
          value={inputs.username}
          type="text"
          name="username"
          required
          placeholder="Enter your username"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          className="form__input"
          onChange={handleInputChange}
          value={inputs.email}
          type="email"
          name="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          className="form__input"
          onChange={handleInputChange}
          value={inputs.password}
          type="password"
          name="password"
          required
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <div className="form__group">
          <p className="form__error">{error}</p>
        </div>
      )}
      <button className="form__button primary" type="submit">
        Register
      </button>
    </form>
  );
}
export default RegisterForm;
