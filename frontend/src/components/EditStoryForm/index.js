import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { getStories, editStory } from '../../store/stories';
import { restoreUser } from '../../store/session';
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
    return story?.id === +storyId
  });
  const currentTitle = currentStory?.title;
  const currentImageUrl = currentStory?.imageUrl;
  const currentBody = currentStory?.body;
  const currentAuthorId = currentStory?.authorId;


  const [title, setTitle] = useState(currentTitle);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [body, setBody] = useState(currentBody);
  const [authorId, setAuthorId] = useState(currentAuthorId);


  const updateTitle = (e) => setTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateBody = (e) => setBody(e.target.value);

  useEffect(() => {
    dispatch(getStories());
    dispatch(editStory());
    dispatch(restoreUser());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    let editedStory;
    editedStory = {
      title,
      imageUrl,
      body,
      authorId,
      id: storyId
    }

    if (editedStory) {
      dispatch(editStory(editedStory, +storyId))
      history.push(`/stories/${storyId}`);
    }
  };


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
              rows="56"
              cols="28"
              required
            />
          </label>
        </div>
        <NavLink to={`/stories/${storyId}`} className='cancelButton'>
          <button>Cancel</button>
        </NavLink>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}



export default EditStoryForm;
