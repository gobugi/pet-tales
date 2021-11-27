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
  const [hideBtn, setHideBtn] = useState(true);

  const openMenu = () => {
    setShowMenu(true);
    setHideBtn(false);
  };

  const cancelMenu = () => {
    setInputValue("");
    setShowMenu(false);
    setHideBtn(true);
  };



  useEffect(() => {
    dispatch(getComments());
    dispatch(getStory());
    dispatch(getStories());
    // dispatch(getUsers());
    // dispatch(restoreUser());
    // dispatch(postComment());
  }, [dispatch]);


  // posting new comment
  async function handlePost(e) {
    e.preventDefault();
    // e.stopPropagation();

    let createdComment
    createdComment = {
      userId: loggedInId,
      storyId: storyIdNum,
      body: inputValue
    }

    setShowMenu(false);
    setHideBtn(true);

    await dispatch(postComment(createdComment))

    dispatch(getComments());

    setInputValue("");
  }




  async function handleDelete(commentId) {
    await dispatch(deleteComment(commentId))
    // history.push('/')
    dispatch(getComments());
  }


  return (
    <div className='commentsDiv'>
      <div className="storyCommentsContainer">
        {(sessionUser) &&
        <div className="storyCommentsDiv">
          {hideBtn && (
          <i onClick={openMenu} className="fas fa-plus-circle fa-2x" style={{visibility:"visible"}}><span id="newComment"> New comment</span></i>
          )}

            {showMenu && (
              <div className="commentFormDiv">
                <form onSubmit={handlePost}>
                  <div>
                      <textarea
                        id="commentTextbox"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your comment here."
                        rows="7"
                        cols="28"
                        required
                      />
                  </div>
                  <button onClick={cancelMenu} type="button">Cancel</button>
                  <button>Submit</button>
                </form>
              </div>
            )}

        </div>}
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
                    <tr>
                      <NavLink id="storyCommentAuthor" to={`/users/${comment.userId}`}>
                        <td className="storyCommentAuthor">{`${(usersArr.find(user => (user?.id === comment?.userId )))?.username}`}</td>
                      </NavLink>
                    </tr>
                    <tr><td id="storyCommentBody">{`${comment.body}`}</td></tr>
                    {(sessionUser?.id === comment?.userId) &&
                    <NavLink to={`/comments/${comment?.id}/edit`} className='commentEditButton'>
                      <button>Edit</button>
                    </NavLink>
                    }
                    {(sessionUser?.id === comment?.userId) &&

                      <button className='commentDeleteButton' onClick={() => {handleDelete(comment?.id)}}>Delete</button>

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
