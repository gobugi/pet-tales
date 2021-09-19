import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { getStories, getStory, editStory, deleteStory } from '../../store/stories';
import './EditStoryForm.css';

const EditStoryForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();


  const sessionUser = useSelector(state => state.session.user);

  const pathUrl = window.location?.pathname.split('/');
  const storyId = pathUrl[pathUrl.length - 2];

  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);

  const currentStory = storiesArr.find(story => {
    return story.id === +storyId
  });
  const currentTitle = currentStory?.title;
  const currentImageUrl = currentStory?.imageUrl;
  const currentBody = currentStory?.body;
  const currentAuthorId = currentStory?.authorId;


  const [title, setTitle] = useState(currentTitle);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [body, setBody] = useState(currentBody);


  const updateTitle = (e) => setTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateBody = (e) => setBody(e.target.value);

  useEffect(() => {
    dispatch(getStories());
    dispatch(getStory());
    dispatch(editStory());
    dispatch(deleteStory());
    // dispatch(restoreUser());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editedStory;
    editedStory = {
      title,
      imageUrl,
      body,
      authorId: (currentStory?.authorId).toString(),
    }

    if (editedStory) {
      dispatch(editStory(editedStory))
      history.push(`/users/${sessionUser.id}`);
    }
  };

  const handleDelete = (currentStory) => {
    dispatch(deleteStory(currentStory));
}


  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input
              type="text"
              defaultValue={currentTitle}
              onChange={updateTitle}
              required
              // placeholder="Title"
            />
          </label>
        </div>
        <div>
          <label>
            Image URL
            <input
              type="text"
              defaultValue={currentImageUrl}
              onChange={updateImageUrl}
              required
              // placeholder="Image URL"
            />
          </label>
        </div>
        <div>
          <label>
          New story
            <textarea
              defaultValue={currentBody}
              onChange={updateBody}
              // placeholder="Type your story here."
              rows="7"
              cols="28"
              required
            />
          </label>
        </div>
        <button type="submit">Edit</button>
        <NavLink to={`/users/${sessionUser.id}`} className='deleteStoryButton' onClick={() => handleDelete()}>
          <button>Delete</button>
        </NavLink>
        <NavLink to={`/users/${sessionUser.id}`} className='cancelButton'>
          <button>Cancel</button>
        </NavLink>
      </form>
    </div>
  );
}



export default EditStoryForm;