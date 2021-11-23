import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { postStory } from '../../store/stories';
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';
import { useHistory, NavLink } from 'react-router-dom';

import './StoryFormPage.css';

const StoryFormPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [body, setBody] = useState('');
  const [authorId, setAuthorId] = useState(``);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateBody = (e) => setBody(e.target.value);
  const updateAuthorId = (e) => setAuthorId(e.target.value);

  const sessionUser = useSelector(state => state.session.user);


  // useEffect(() => {
  //   dispatch(postStory());
  //   dispatch(getStories());
  //   dispatch(getUsers());
  //   dispatch(restoreUser());
  // }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let createdStory
    createdStory = {
      authorId: sessionUser?.id,
      imageUrl,
      title,
      body,
    }

    const newStory = await dispatch(postStory(createdStory))
    if (newStory) {
      history.push(`/users/${sessionUser?.id}`);
    }
  };

  // console.log(newStory);

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setImageUrl(e.target.value)}
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
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your story here."
              rows="7"
              cols="28"
              required
            />
          </label>
        </div>
        {/* <div>
          <label>
            authorId
            <input
              type="number"
              value={sessionUser?.id}
              onChange={updateAuthorId}
              required
              // placeholder="Image URL"
            />
          </label>
        </div> */}
        <NavLink to={`/users/${sessionUser.id}`}>
          <button type="button">Cancel</button>
        </NavLink>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StoryFormPage;
