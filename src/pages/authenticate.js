import { useState } from 'react';
import LogInForm from 'components/login-form/login-form';
import RegisterForm from 'components/register-form/register-form';

function Authenticate() {
  const [registerFormToggled, setRegisterFormToggled] = useState(false);

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
