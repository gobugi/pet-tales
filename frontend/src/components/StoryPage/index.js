import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { getStory, getStories } from '../../store/stories'
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';
import { getComments } from '../../store/comments';
import StoryFormPage from '../StoryFormPage';
import './StoryPage.css';


const StoryPage = () => {
  const dispatch = useDispatch();

  // const { id } = useParams();
  // const story = useSelector(state => state.stories[id]);

  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);

  const users = useSelector((state) => state.users);
  const usersArr = Object.values(users);

  const session = useSelector((state) => state.session);
  const sessionArr = Object.values(session);

  const location = useLocation();
  const storyId = window.location?.pathname.split('/').pop(-1);

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

  useEffect(() => {
    // dispatch(getStory(id));
    dispatch(getStories());
    dispatch(getUsers());
    dispatch(restoreUser());
  }, [dispatch]);


  return (
    <div className='storyDiv'>
      <div className="storyBanner" style={{backgroundImage: `url(${currentStory?.imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div className="storyBannerDarkOverlay" />
      </div>
      <div className="bigStoryContainer">
        <h2 className="bigStoryTitle">~ {currentUserId === +userId ? 'My' : `${author}'s` } story ~</h2>
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
                  <NavLink to={`${window.location?.pathname}/edit`}>
                    <button className="storyPageEditButton">Edit</button>
                  </NavLink>
                  }
                </td>
              </tr>
            </table>
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default StoryPage;
