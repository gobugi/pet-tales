import React, { useState } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { postStory } from '../../store/stories';
import { useHistory } from 'react-router-dom';
import './StoryFormPage.css';

const StoryFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();


  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [body, setBody] = useState('');


  const updateTitle = (e) => setTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateBody = (e) => setBody(e.target.value);


  const sessionUser = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let createdStory;
    createdStory = {
      title,
      imageUrl,
      body,
      authorId: sessionUser.id,
    }

    if (createdStory) {
      dispatch(postStory(createdStory))
      history.push(`/stories/${sessionUser.id}`);
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
              value={title}
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
              value={imageUrl}
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
              value={body}
              onChange={updateBody}
              placeholder="Type your story here."
              rows="7"
              cols="28"
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StoryFormPage;
