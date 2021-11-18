import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { Redirect, useLocation, useHistory, NavLink } from 'react-router-dom';
import './CommentsFromAStory.css';

import { getComments, deleteComment, postComment } from '../../store/comments';
import { getStories, getStory } from '../../store/stories';
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
  const [inputValue, setInputValue] = useState("");


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
    dispatch(getStory());
    dispatch(getStories());
    // dispatch(getUsers());
    // dispatch(restoreUser());
    // dispatch(postComment());
  }, [dispatch]);



  async function handlePost(e) {
    // e.preventDefault();
    // e.stopPropagation();

    let createdComment
    createdComment = {
      userId: loggedInId,
      storyId: storyIdNum,
      body: inputValue
    }

    await dispatch(postComment(createdComment))
    // history.push(`/stories/${urlStoryId}`);
  }




  async function handleDelete(commentId) {
    await dispatch(deleteComment(commentId))
    // history.push('/')
  }


  return (
    <div className='commentsDiv'>
      <div className="storyCommentsContainer">
        {(sessionUser) &&
          <i onClick={openMenu} className="fas fa-plus-circle fa-3x">
            {showMenu && (
              <div className="commentFormDiv">
                <form onSubmit={handlePost}>
                  <div>
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your comment here."
                        rows="7"
                        cols="28"
                        required
                      />
                  </div>
                  <a href={`/stories/${urlStoryId}`} className='cancelButton'>
                    <button type="button">Cancel</button>
                  </a>
                  <button>Submit</button>
                </form>
              </div>
            )}
          </i>}
        <table className="storyCommentsTable">
          <tbody id="storyCommentsTbody">
            <div id="storyCommentsHeader">Comments</div>
            {allCommentsFromStory.map((comment) =>
            <table className="storyCommentTable">
              <tr className="storyCommentTr">
                <td className="storyCommentImg" />
                <td className="storyCommentTd">
                    <table>
                    <tr><td className="storyCommentTitle"></td></tr>
                    <tr><a id="storyCommentAuthor" href={`/users/${comment.userId}`}><td className="storyCommentAuthor">{`${(usersArr.find(user => (user?.id === comment?.userId )))?.username}`}</td></a></tr>
                    <tr><td id="storyCommentBody">{`${comment.body}`}</td></tr>
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
