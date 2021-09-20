import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { getComments, editComment, getComment } from '../../store/comments';
import { getStories } from '../../store/stories';
import { restoreUser } from '../../store/session';
import './EditCommentForm.css';

const EditCommentForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();


  const sessionUser = useSelector(state => state.session.user);

  const pathUrl = window.location?.pathname.split('/');
  const commentId = pathUrl[pathUrl.length - 2];

  const comments = useSelector((state) => state.comments);
  const commentsArr = Object.values(comments);

  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);


  const currentComment = commentsArr.find(comment => {
    return comment?.id === +commentId
  });

  const currentUserId = currentComment?.userId;
  const currentStoryId = currentComment?.storyId;
  const currentBody = currentComment?.body;


  const currentStory = storiesArr.find(story => {
    return story?.id === currentStoryId
  });



  const [userId, setUserId] = useState(currentUserId);
  const [storyId, setStoryId] = useState(currentStoryId);
  const [body, setBody] = useState(currentBody);


  const updateUserId = (e) => setUserId(e.target.value);
  const updateStoryId = (e) => setStoryId(e.target.value);
  const updateBody = (e) => setBody(e.target.value);


  useEffect(() => {
    dispatch(getComments());
    // dispatch(getComment());
    // dispatch(getStories());
    // dispatch(editComment());
    // dispatch(restoreUser());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    let editedComment;
    editedComment = {
      userId,
      storyId,
      body,
      id: commentId
    }

    if (editedComment) {
      dispatch(editComment(editedComment, +commentId))
      history.push(`/stories/${currentStoryId}`);
    }
  };

  console.log(currentStoryId)

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>
            userId
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
            storyId
            <input
              type="text"
              defaultValue={currentImageUrl}
              onChange={updateImageUrl}
              required
              // placeholder="Image URL"
            />
          </label>
        </div> */}
        <div>
          <label>
          Comment
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
        <NavLink to={`/stories/${currentStoryId}`} className='cancelButton'>
          <button>Cancel</button>
        </NavLink>
      </form>
    </div>
  );
}

export default EditCommentForm;
