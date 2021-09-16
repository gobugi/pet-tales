// Define Action Types as Constants
const SET_STORIES = 'stories/setStories';

// Define Action Creators
const setStories = (stories) => ({
  type: SET_STORIES,
  stories,
});

// Define Thunks
export const getStories = () => async (dispatch) => {
  const res = await fetch('/api/stories');
  const stories = await res.json();
  dispatch(setStories(stories));
};

// Define an initial state
const initialState = {};

// Define a reducer
const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORIES:
      const newState = {};
      action.stories.forEach(story => newState[story.id] = story);
      return newState;
    default:
      return state;
  }
};

// Export the reducer
export default storiesReducer;
