// Define Action Types as Constants
const SET_COMMENTS = 'comments/setComments';

// Define Action Creators
const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

// Define Thunks
export const getComments = () => async (dispatch) => {
  const res = await fetch('/api/comments');
  const comments = await res.json();
  dispatch(setComments(comments));
};

// Define an initial state
const initialState = {};

// Define a reducer
const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      const newState = {};
      action.comments.forEach(comment => newState[comment.id] = comment);
      return newState;
    default:
      return state;
  }
};

// Export the reducer
export default commentsReducer;
