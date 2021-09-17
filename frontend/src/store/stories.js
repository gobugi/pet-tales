// Define Action Types as Constants
const SET_STORIES = 'stories/setStories';

const LOAD_STORY = "stories/LOAD_STORY";
const REMOVE_STORY= "stories/REMOVE_STORY";
const UPDATE_STORY= "stories/UPDATE_STORY";
const ADD_STORY= "stories/ADD_STORY";

// Define Action Creators
const setStories = (stories) => ({
  type: SET_STORIES,
  stories,
});

const loadStory = (story) => ({
  type: LOAD_STORY,
  story,
});

const removeStory = (storyId) => ({
  type: REMOVE_STORY,
  storyId,
});

const updateStory = (story) => ({
  type: UPDATE_STORY,
  story,
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

export const getStory = (id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`);

  if (response.ok) {
    const stories = await response.json();
    dispatch(loadStory(stories));
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
    dispatch(addStory(newStory));
  }
};


export const editStory = (story, id) => async dispatch => {
  const response = await fetch(`/api/stories/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...story, id})
  });

  if (response.ok) {
    const updatedStory = await response.json();
    dispatch(updateStory(updatedStory));
  }
}



// Define an initial state
const initialState = {};

// Define a reducer
const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORIES: {
      const newState = {};
      action.stories.forEach(story => newState[story.id] = story);
      return newState;
    }
    case REMOVE_STORY: {
      const newState = { ...state };
      delete newState[action.storyId];
      return newState;
    }
    case ADD_STORY:
    case UPDATE_STORY: {
      return {
        ...state,
        [action.story.id]: action.story,
      };
    }
    default:
      return state;
  }
};

// Export the reducer
export default storiesReducer;
