import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getStories, getStory, editStory, deleteStory } from '../../store/stories';
import './EditStoryForm.css';

const EditStoryForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();


  const sessionUser = useSelector(state => state.session.user);
  if(!sessionUser) history.push('/');

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [body, setBody] = useState('');


  const pathUrl = location?.pathname.split('/');
  const storyId = pathUrl[pathUrl.length - 2];

  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);

  const currentStory = storiesArr.find(story => {
    return story.id === +storyId
  })

  const currentTitle = currentStory?.title;
  const currentImageUrl = currentStory?.imageUrl;
  const currentBody = currentStory?.body;

  console.log(currentBody)

  // const storiesArr = Object.values(stories);
  // const currentStory = storiesArr[+storyId - 1];

  useEffect(() => {
    dispatch(getStories());
    dispatch(getStory());
    // dispatch(restoreUser());
  }, [dispatch]);


  const updateTitle = (e) => setTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateBody = (e) => setBody(e.target.value);



  const handleSubmit = async (e) => {
    e.preventDefault();

    let editedStory;
    editedStory = {
      title: currentTitle,
      imageUrl: currentImageUrl,
      body: currentBody,
      authorId: sessionUser.id,
    }

    if (editedStory) {
      dispatch(editStory(editedStory))
      history.push(`/users/${sessionUser.id}`);
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
              rows="7"
              cols="28"
              required
            >
            </textarea>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditStoryForm;
