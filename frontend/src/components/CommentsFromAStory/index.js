import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { Redirect, useLocation, useHistory, NavLink } from 'react-router-dom';
import './CommentsFromAStory.css';

import { getComments, deleteComment, postComment } from '../../store/comments';
import { getStories } from '../../store/stories';
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';


const CommentsFromAStory = () => {
  const dispatch = useDispatch();
  const history = useHistory();





  const comments = useSelector((state) => state.comments);
  const commentsArr = Object.values(comments);

  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);

  const users = useSelector((state) => state.users);
  const usersArr = Object.values(users);

  const session = useSelector((state) => state.session);
  const sessionArr = Object.values(session);
  const sessionUser = useSelector(state => state.session.user);


  const location = useLocation();
  const urlStoryId = window.location?.pathname.split('/').pop(-1);
  const currentStory = storiesArr.find(story => {
    return story?.id === +urlStoryId
  });

  const currentComment = commentsArr.find(comment => {
    return comment?.storyId === +urlStoryId
  });

  const allCommentsFromStory = commentsArr.filter((comment) => comment?.storyId === currentStory?.id)
  const storyIdNum = +urlStoryId
  const loggedInId = sessionUser?.id

  const [userId, setUserId] = useState('');
  const [storyId, setStoryId] = useState('');
  const [body, setBody] = useState('');


  const updateUserId = (e) => setUserId(e.target.value);
  const updateStoryId = (e) => setStoryId(e.target.value);
  const updateBody = (e) => setBody(e.target.value);


  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(true);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);






  useEffect(() => {
    dispatch(getComments());
    dispatch(getStories());
    dispatch(getUsers());
    dispatch(restoreUser());
  }, [dispatch]);



  async function handlePost(e) {
    e.preventDefault();

    let createdComment
    createdComment = {
      userId: loggedInId,
      storyId: storyIdNum,
      body,
    }

    await dispatch(postComment(createdComment))
  }



  async function handleDelete(commentId) {
    await dispatch(deleteComment(commentId))
    // history.push('/')
  }

  return (
    <div className='commentsDiv'>
      <div className="storyCommentsContainer">
        {(sessionUser) &&
          <i onClick={openMenu} className="fas fa-plus-circle fa-3x"></i>}
          {showMenu && (
            <div>
              {/* <div>
                <label>
                  userId
                  <input
                    type="number"
                    value={loggedInId}
                    onChange={updateUserId}
                    required
                    // placeholder="userId"
                  />
                </label>
              </div>
              <div>
                <label>
                  storyId
                  <input
                    type="number"
                    value={storyIdNum}
                    onChange={updateStoryId}
                    required
                    // placeholder="storyId"
                  />
                </label>
              </div> */}
              <div id="commentTextareaDiv">
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
                <a href={`/stories/${urlStoryId}`}>
                  <button className='commentPostButton' onClick={() => {handlePost()}}>Post</button>
                </a>
                <a href={`/stories/${urlStoryId}`}>
                  <button>Cancel</button>
                </a>
              </div>
            </div>
          )}

        <table className="storyCommentsTable">
          <tbody className="storyCommentsTbody">
            {allCommentsFromStory.map((comment) =>
            <table className="storyCommentTable">
              <tr className="storyCommentTr">
                <td className="storyCommentImg" />
                <td className="storyCommentTd">
                    <table>
                    <tr><td className="storyCommentTitle"></td></tr>
                    <tr><a className="storyCommentAuthor" href={`/users/${comment.userId}`}><td className="storyCommentAuthor">{`by ${(usersArr.find(user => (user?.id === comment?.userId )))?.username}`}</td></a></tr>
                    <tr><td className="storyCommentBody">{comment.body}</td></tr>
                    {(sessionUser?.id === comment?.userId) &&
                    <NavLink to={`/comments/${comment?.id}/edit`} className='commentEditButton'>
                      <button>Edit</button>
                    </NavLink>
                    }
                    {(sessionUser?.id === comment?.userId) &&
                    <a href={`/stories/${urlStoryId}`}>
                      <button className='commentDeleteButton' onClick={() => {handleDelete(comment?.id)}}>Delete</button>
                    </a>
                    }
                    </table>
                </td>
              </tr>
            </table>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default CommentsFromAStory;
