import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { NavLink, useParams, useLocation, useHistory, Redirect } from 'react-router-dom';
import { getStories, deleteStory } from '../../store/stories'
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';
import { getComments } from '../../store/comments';
import StoryFormPage from '../StoryFormPage';
import './StoryPage.css';

import CommentsFromAStory from '../CommentsFromAStory';


const StoryPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const { id } = useParams();
  // const story = useSelector(state => state.stories[id]);

  const sessionUser = useSelector(state => state.session.user);

  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);

  const users = useSelector((state) => state.users);
  const usersArr = Object.values(users);

  const session = useSelector((state) => state.session);
  const sessionArr = Object.values(session);

  const location = useLocation();
  const storyId = window.location?.pathname?.split('/').pop(-1);

  const currentStory = storiesArr.find(story => {
    return story?.id === +storyId
  });

  const currentUser = usersArr.find(user => {
    return user?.id === +currentStory?.authorId
  });

  const userId = currentUser?.id

  const author = usersArr[+userId - 1]?.username;
  // const currentUser = sessionArr[0]?.username;
  const currentUserId = sessionArr[0]?.id;

  const id = +storyId

  useEffect(() => {
    dispatch(getStories());
    dispatch(getUsers());
    dispatch(restoreUser());
    // dispatch(deleteStory());
  }, [dispatch]);

  async function handleDelete(storyId) {
    await dispatch(deleteStory(storyId))
    // history.push('/')
  }

//   const handleDelete = (id) => {
//     dispatch(deleteStory(id));
//     // history.push(`/users/${sessionUser?.id}`);
// }

  return (
    <div className='storyDiv'>
      <div className="storyBanner" style={{backgroundImage: `url(${currentStory?.imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div className="storyBannerDarkOverlay" />
      </div>
      <div className="bigStoryContainer">
        <h2 className="bigStoryTitle">~ {currentUserId === +userId ? 'My' : <NavLink id="bigStoryAnchor" to={`/users/${userId}`}>{`${author}'s`}</NavLink>} story ~</h2>
        <table className="bigStoryTable">
          <tbody className="bigStoryTbody">
            <table className="smallStoryTable">
              <tr className="smallStoryTr">
                <td className="smallStoryImg" />
                <td className="smallStoryTd">
                  <table>
                    <tr><td className="smallStoryTitle">{`${currentStory?.title}`}</td></tr>
                    <tr><a className="smallStoryAuthor" href={`/users/${userId}`}><td className="smallStoryAuthor">{`by ${currentUser?.username}`}</td></a></tr>
                    <tr><td className="smallStoryBody">{`${currentStory?.body}`}</td></tr>
                  </table>
                    {(currentUser?.id === currentUserId) &&
                      <NavLink to={`/stories/${storyId}/edit`}>
                        <button className="storyPageEditButton">Edit</button>
                      </NavLink>
                    }
                    {(currentUser?.id === currentUserId) &&

                        <button className='storyPageDeleteButton' onClick={() => {handleDelete(currentStory?.id)}}>Delete</button>

                    }
                </td>
              </tr>
            </table>
          </tbody>
        </table>
        <CommentsFromAStory/>
      </div>
    </div>
  )
}


export default StoryPage;
