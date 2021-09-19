import React, { useEffect, useState } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { postStory, getStories, editStory, deleteStory } from '../../store/stories';
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './StoryFormPage.css';

const StoryFormPage = () => {

  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();


  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [body, setBody] = useState('');
  const [authorId, setAuthorId] = useState(`${sessionUser?.id}`);


  const updateTitle = (e) => setTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateBody = (e) => setBody(e.target.value);
  const updateAuthorId = (e) => setAuthorId(e.target.value);

  useEffect(() => {
    dispatch(postStory());
    dispatch(getStories());
    dispatch(getUsers());
    dispatch(editStory());
    dispatch(deleteStory());
    dispatch(restoreUser());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let createdStory;
    createdStory = {
      title,
      imageUrl,
      body,
      authorId,
    }

    // if (createdStory) {
      dispatch(postStory(createdStory))
      history.push(`/users/${sessionUser?.id}`);
    // }
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
        <div style={{visibility: 'hidden'}}>
          <label>
            authorId
            <input
              type="text"
              value={authorId}
              onChange={updateAuthorId}
              required
              // placeholder="Image URL"
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StoryFormPage;
