import { csrfFetch } from "./csrf";

// Define Action Types as Constants
const SET_STORIES = 'stories/setStories';
const LOAD_STORY = "stories/LOAD_STORY";
const REMOVE_STORY = "stories/REMOVE_STORY";
const UPDATE_STORY = "stories/UPDATE_STORY";
const ADD_STORY = "stories/ADD_STORY";

// Define Action Creators
const setStories = (stories) => ({
  type: SET_STORIES,
  stories,
});

const loadStory = (story) => {
  return {
      type: LOAD_STORY,
      story,
  }
};

const removeStory = (story) => {
  return {
      type: REMOVE_STORY,
      story,
  }
};

const updateStory = (story) => {
  return {
      type: UPDATE_STORY,
      story,
  }
};

const addStory = (story) => {
  return {
      type: ADD_STORY,
      story,
  }
};

// Define Thunks
export const getStories = () => async (dispatch) => {
  const res = await fetch('/api/stories');
  const stories = await res.json();
  dispatch(setStories(stories));
};

export const editStory = (story, id) => async dispatch => {
  const response = await csrfFetch(`/api/stories/${story.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...story, id})
  });

  if (response.ok) {
    const updatedStory = await response.json();
    dispatch(updateStory(updatedStory));
  }
};

export const getStory = (id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`);

  if (response.ok) {
    const story = await response.json();
    dispatch(loadStory(story));
  }
};

export const postStory = (story) => async dispatch => {
  const response = await csrfFetch('/api/stories', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(story)
  })
  if (response.ok) {
    const newStory = await response.json();
    dispatch(addStory(newStory));
    return newStory
  }
};

export const deleteStory = (story, id) => async dispatch => {
  const response = await csrfFetch(`/api/stories/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(story)
  })
  if (response.ok) {
    dispatch(removeStory(story));
  }
  return response;
};


// Define an initial state
const initialState = {};

// Define a reducer
const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STORY:
    case REMOVE_STORY: {
      const newState = { ...state };
      delete newState[action.storyId];
      return newState;
    }
    case UPDATE_STORY: {
      return {
        ...state,
        [action.story.id]: action.story,
      };
    }
    case SET_STORIES: {
      const newState = {};
      Object.values(action.stories).forEach(story => {
        newState[story.id] = story;
      });
      return newState;
    }
    case LOAD_STORY: {
      const newState = {
        ...state,
        [action.story.id]: action.story,
      };
    return newState;
    }
    default:
      return state;
  }
};

// Export the reducer
export default storiesReducer;
