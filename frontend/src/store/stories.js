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

export const getStory = (id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`);

  if (response.ok) {
    const stories = await response.json();
    dispatch(setStories(stories));
  }
}


export const postStory = (stories) => async dispatch => {
  const response = await fetch('/api/stories', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(stories)
  })
  if (response.ok) {
    const newStory = await response.json();
    dispatch(setStories(newStory));
  }
};

export const editStory = (stories, id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...stories, id})
  });

  if (response.ok) {
    const updatedStory = await response.json();
    dispatch(setStories(updatedStory));
  }
}

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
