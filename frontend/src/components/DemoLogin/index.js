import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './DemoLogin.css';

function DemoLogin() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  // const [credential, setCredential] = useState('');
  // const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to={`/users/${sessionUser.id}`} />
  );

  const handleSubmit = () => {
    // e.preventDefault();
    // setErrors([]);
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
      // });
  }

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <div>
          <label>
            Username or Email
            <input
              type="text"
              // value={credential}
              defaultValue="demo@user.io"
              // onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              // value={password}
              defaultValue="password"
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default DemoLogin;
