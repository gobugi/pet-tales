import { csrfFetch } from './csrf'

/* Create two POJO action creators. One that will set the session user in the session slice of state to the action creator's input parameter,
and another that will remove the session user. Their types should be extracted as a constant and used by the action creator and the session reducer. */

// Define Action Types as Constants (login/logout)
const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

// Define Action Creators (login/logout)
const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});


// Define Thunks (login/logout)
export const login = (user) => async dispatch => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      credential,
      password,
    })
  });

  if (res.ok) {
    const loggedUser = await res.json();
    dispatch(setUser(loggedUser));
    return res;
  }
};

export const logout = () => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return res;
};





// Define an initial state
const initialState = {
  user: null
}

// Define a reducer
const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

// Export the reducer
export default userReducer;
