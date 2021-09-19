import { csrfFetch } from "./csrf";

const pathUrl = window.location?.pathname.split('/');
const storyId = pathUrl[pathUrl.length - 1];
const StoryDeleteId = parseInt(storyId, 10);
const storyEditId = pathUrl[pathUrl.length - 2];


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

// const loadStory = (story) => {
//   return {
//       type: LOAD_STORY,
//       story,
//   }
// };

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


export const editStory = (story, storyEditId) => async dispatch => {
  const res = await csrfFetch(`/api/stories/${storyEditId}`, {
    method: 'PUT',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(story)
  });

  if (res.ok) {
    const editedStory = await res.json();
    dispatch(updateStory(editedStory));
    return editedStory
  }
}


// export const getStory = (story) => async dispatch => {
//   const response = await fetch(`/api/stories/${storyId}`);

//   if (response.ok) {
//     const story = await response.json();
//     dispatch(loadStory(story));
//   }
// };

export const postStory = (story) => async dispatch => {
  const response = await csrfFetch('/api/stories', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({story})
  })
  if (response.ok) {
    const newStory = await response.json();
    dispatch(addStory(newStory));
    return newStory
  }
};

// export const deleteStory = (story) => async dispatch => {
//   const response = await csrfFetch(`/api/stories/${storyId}`, {
//     method: 'DELETE',
//     body: JSON.stringify(story)
//   })
//   if (response.ok) {
//     dispatch(removeStory(story));
//   }
//   return response;
// };

export const deleteStory = (storyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/stories/${storyId}`, {
    method: 'DELETE',
  });
  dispatch(removeStory());
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
    // case LOAD_STORY: {
    //   const newState = {
    //     ...state,
    //     [action.story.id]: action.story,
    //   };
    // return newState;
    // }
    default:
      return state;
  }
};

// Export the reducer
export default storiesReducer;
