// import { csrfFetch } from "./csrf";

// Define Action Types as Constants
const SET_USERS = 'users/setUsers';

// Define Action Creators
const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

// Define Thunks
export const getUsers = () => async (dispatch) => {
  const res = await fetch('/api/users');
  const users = await res.json();
  dispatch(setUsers(users));
};

// Define an initial state
const initialState = {};

// Define a reducer
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      const newState = {};
      Object.values(action.users).forEach(user => {
        newState[user.id] = user;
      });
      return newState;
    }
    default:
      return state;
  }
};

// Export the reducer
export default usersReducer;
