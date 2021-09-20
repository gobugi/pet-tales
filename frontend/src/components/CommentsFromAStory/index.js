import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { Redirect, useLocation, useHistory, NavLink } from 'react-router-dom';
import './CommentsFromAStory.css';

import CreateComment from '../CreateComment';

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

  const allCommentsFromStory = commentsArr.filter((comment) => comment?.storyId === currentStory?.id)



  useEffect(() => {
    dispatch(getComments());
    dispatch(getStories());
    dispatch(getUsers());
    dispatch(restoreUser());
  }, [dispatch]);

  async function handleDelete(commentId) {
    await dispatch(deleteComment(commentId))
    // history.push('/')
  }

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

  // <CreateComment/>

  return (
    <div className='commentsDiv'>
      <div className="storyCommentsContainer">
        {(sessionUser) &&
          <i className="fas fa-plus-circle fa-3x"></i>
        }
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
