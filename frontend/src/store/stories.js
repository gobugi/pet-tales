
// Define Action Types as Constants
const SET_STORIES = 'stories/setStories';
const ADD_STORY= "stories/ADD_STORY";

// Define Action Creators
const setStories = (stories) => ({
  type: SET_STORIES,
  stories,
});

const addStory = (story) => ({
  type: ADD_STORY,
  story,
});

// Define Thunks
export const getStories = () => async (dispatch) => {
  const res = await fetch('/api/stories');
  const stories = await res.json();
  dispatch(setStories(stories));
};

export const editStory = (story, id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...story, id})
  });

  if (response.ok) {
    const updatedStory = await response.json();
    dispatch(addStory(updatedStory));
  }
};

export const getStory = (id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`);

  if (response.ok) {
    const story = await response.json();
    dispatch(addStory(story));
  }
};

export const postStory = (story) => async dispatch => {
  const response = await fetch('/api/stories', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(story)
  })
  if (response.ok) {
    const newStory = await response.json();
    dispatch(addStory(newStory));
  }
};

// Define an initial state
const initialState = {};

// Define a reducer
const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STORY: {
      if (!state[action.story.id]) {
        const newState = {
          ...state,
          [action.story.id]: action.story
        };
        return newState;
      }
      return {
        ...state,
        [action.story.id]: {
          ...state[action.story.id],
          ...action.story,
        }
      };
    }
    case SET_STORIES: {
      const newState = {};
      Object.values(action.stories).forEach(story => {
        newState[story.id] = story;
      });
      return newState;
    }
    default:
      return state;
  }
};

// Export the reducer
export default storiesReducer;
