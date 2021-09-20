import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
// import { postComment } from '../../store/stories';
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';
import { useHistory } from 'react-router-dom';

import './CreateComment.css';

const CreateComment = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [userId, setUserId] = useState('');
  const [storyId, setStoryId] = useState('');
  const [body, setBody] = useState('');


  const updateUserId = (e) => setUserId(e.target.value);
  const updateStoryId = (e) => setStoryId(e.target.value);
  const updateBody = (e) => setBody(e.target.value);


  const sessionUser = useSelector(state => state.session.user);

  const pathUrl = window.location?.pathname.split('/');
  const urlStoryId = pathUrl[pathUrl.length - 1];

  const comments = useSelector((state) => state.comments);
  const commentsArr = Object.values(comments);

  const currentComment = commentsArr.find(comment => {
    return comment?.storyId === +urlStoryId
  });

  // useEffect(() => {
  //   dispatch(postStory());
  //   dispatch(getStories());
  //   dispatch(getUsers());
  //   dispatch(restoreUser());
  // }, [dispatch]);

  const handlePost = async (e) => {
    e.preventDefault();

    let createdComment
    createdComment = {
      userId,
      storyId,
      body,
      id: currentComment
    }

    const newComment = await dispatch(postComment(createdComment))
    if (newComment) {
      history.push(`/stories/${urlStoryId}`);
    }
  };



  return (
    <div className='formContainer'>
      <form onSubmit={handlePost}>
        {/* <div>
          <label>
            userId
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
            storyId
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              // placeholder="Image URL"
            />
          </label>
        </div> */}
        <div>
          <label>
          Comment
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your comment here."
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
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreateComment;
