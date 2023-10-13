import { useState } from 'react';
import { signInUser, getFrontendErrorMessage } from 'utils/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signInUser(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(getFrontendErrorMessage(res.error));
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2 className="form__title">Log into your account</h2>
      <div className="form__group">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          className="form__input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          required
          type="password"
          placeholder="Enter your password"
        />
      </div>
      {error && (
        <div className="form__group">
          <p className="form__error">{error}</p>
        </div>
      )}
      <button className="form__button primary" type="submit">
        Log in
      </button>
    </form>
  );
}
export default LogInForm;
