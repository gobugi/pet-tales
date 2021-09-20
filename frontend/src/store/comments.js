import { csrfFetch } from "./csrf";

const pathUrl = window.location?.pathname.split('/');
const commentId = pathUrl[pathUrl.length - 1];
const commentEditId = pathUrl[pathUrl.length - 2];


// Define Action Types as Constants
const SET_COMMENTS = 'comments/setComments';
const LOAD_COMMENT = "comments/LOAD_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const ADD_COMMENT = "comments/ADD_COMMENT";

// Define Action Creators
const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

const loadComment = (comment) => {
  return {
      type: LOAD_COMMENT,
      comment,
  }
};

const removeComment = (comment) => {
  return {
      type: REMOVE_COMMENT,
      comment,
  }
};

const updateComment = (comment) => {
  return {
      type: UPDATE_COMMENT,
      comment,
  }
};

const addComment = (comment) => {
  return {
      type: ADD_COMMENT,
      comment,
  }
};

// Define Thunks
export const getComments = () => async (dispatch) => {
  const res = await fetch('/api/comments');
  const comments = await res.json();
  dispatch(setComments(comments));
};


export const editComment = (comment, commentEditId) => async dispatch => {
  const res = await csrfFetch(`/api/comments/${commentEditId}`, {
    method: 'PUT',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    const editedComment = await res.json();
    dispatch(updateComment(editedComment));
    return editedComment
  }
}


export const getComment = (comment) => async dispatch => {
  const response = await fetch(`/api/comments/${commentId}`);

  if (response.ok) {
    const comment = await response.json();
    dispatch(loadComment(comment));
  }
};

export const postComment = (comment) => async dispatch => {
  const response = await csrfFetch('/api/comments/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })
  if (response.ok) {
    const newComment = await response.json();
    dispatch(addComment(newComment));
    return newComment
  }
};


export const deleteComment = (commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });
  dispatch(removeComment());
  return response;
};


// Define an initial state
const initialState = {};

// Define a reducer
const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
    case REMOVE_COMMENT: {
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    }
    case UPDATE_COMMENT: {
      return {
        ...state,
        [action.comment.id]: action.comment,
      };
    }
    case SET_COMMENTS: {
      const newState = {};
      Object.values(action.comments).forEach(comment => {
        newState[comment.id] = comment;
      });
      return newState;
    }
    case LOAD_COMMENT: {
      const newState = {
        ...state,
        [action.comment.id]: action.comment,
      };
    return newState;
    }
    default:
      return state;
  }
};

// Export the reducer
export default commentsReducer;
