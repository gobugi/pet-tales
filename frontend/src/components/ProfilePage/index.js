import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { Redirect, useLocation, NavLink } from 'react-router-dom';
import './ProfilePage.css';


import { getStories } from '../../store/stories';
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);


  const users = useSelector((state) => state.users);
  const usersArr = Object.values(users);

  const session = useSelector((state) => state.session);
  const sessionArr = Object.values(session);

  const location = useLocation();
  const userId = window.location?.pathname.split('/').pop(-1);
  const author = usersArr[+userId - 1]?.username;
  const currentUser = sessionArr[0]?.username;
  const currentUserId = sessionArr[0]?.id;

  const myStories = storiesArr.filter((story) => story.authorId === +userId)

  useEffect(() => {
    dispatch(getStories());
    dispatch(getUsers());
    dispatch(restoreUser());
  }, [dispatch]);

// console.log(storiesArr[0].id)

  return (
    <div className='profileDiv'>
      <div className="profileBanner" style={{backgroundImage: 'url(/images/profilebanner.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div className="bannerDarkOverlay">
            <div id={`welcome`}>
              {(currentUserId === +userId) && `Welcome`}
            </div>
            <div id={`profileBannerUser`}>
              {(currentUserId === +userId) && currentUser}
            </div>
        </div>
      </div>
      <div className="profileStoriesContainer">
        <h2 className="profileStoriesTitle">~ {currentUserId === +userId ? 'My' : `${author}'s` } stories ~</h2>
        {(currentUserId === +userId) &&
        <NavLink to='/stories/new'>
          <i className="fas fa-plus-circle fa-3x"></i>
        </NavLink>
        }
        <table className="profileStoriesTable">
          <tbody className="profileStoriesTbody">
            {myStories.map((story) =>
            <table className="profileStoryTable">
              <tr className="profileStoryTr">
                <td className="profileStoryImg">
                  <NavLink className="storyImages" to={`/stories/${story.id}`}>
                    <img className="storyImages" src={`${story.imageUrl}`} alt="petImage" />
                  </NavLink>
                </td>
                <td className="profileStoryTd">
                    <table>
                    <tr>
                      <NavLink className="profileStoryTitle" to={`/stories/${story.id}`}>
                        <td className="profileStoryTitle">{story.title}</td>
                      </NavLink>
                    </tr>
                    <tr>
                      <NavLink className="profileStoryAuthor" to={`/users/${story.authorId}`}>
                        <td className="profileStoryAuthor">{`by ${author}`}</td>
                      </NavLink>
                    </tr>
                    <tr><td className="profileStoryBody">{story.body}</td></tr>
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


export default ProfilePage;
