import { useState, useContext, useEffect } from 'react';
import LogInForm from 'components/login-form/login-form';
import RegisterForm from 'components/register-form/register-form';
import { MainContext } from 'utils/context';
import { useNavigate } from 'react-router-dom';

function Authenticate() {
  const { user, loading } = useContext(MainContext);
  const [registerFormToggled, setRegisterFormToggled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    !loading && user && navigate('/');
  }, [loading]);

  return registerFormToggled ? (
    <div className="authenticate">
      <RegisterForm />
      <p>
        Already have an account?{' '}
        <b
          className="authenticate__anchor"
          onClick={() => setRegisterFormToggled(false)}
        >
          Login
        </b>
      </p>
    </div>
  ) : (
    <div className="authenticate">
      {' '}
      <LogInForm />{' '}
      <p>
        Don't have an account?{' '}
        <b
          className="authenticate__anchor"
          onClick={() => setRegisterFormToggled(true)}
        >
          Register
        </b>
      </p>
    </div>
  );
}
export default Authenticate;
