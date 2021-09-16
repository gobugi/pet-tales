import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './StoryFormPage.css';

function StoryFormPage({ user }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const openForm = () => {
    if (showForm) return;
    setShowForm(true);
  };

  useEffect(() => {
    if (!showForm) return;

    const closeForm = () => {
      setShowForm(false);
    };

    document.addEventListener('click', closeForm);

    return () => document.removeEventListener("click", closeForm);
  }, [showForm]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <div>
          <label>
            Title
            <input
              type="text"
              // value={credential}
              // onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Image URL
            <input
              type="text"
              // value={credential}
              // onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Comment
            <textarea
              // type="text"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              rows="7"
              cols="28"
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StoryFormPage;
