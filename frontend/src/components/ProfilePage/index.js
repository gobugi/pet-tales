import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect, useLocation } from 'react-router-dom';
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
  const userId = location?.pathname.split('/').pop(-1);
  const author = usersArr[+userId - 1]?.username;
  const currentUser = sessionArr[0]?.username;

  const myStories = storiesArr.filter((story) => story.authorId === +userId)

  useEffect(() => {
    dispatch(getStories());
    dispatch(getUsers());
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <div className='profileDiv'>
      <div className="profileBanner" style={{backgroundImage: 'url(/images/profilebanner.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div className="bannerDarkOverlay">
            <div id={`welcome`}>
              {(currentUser === author) && `Welcome`}
            </div>
            <div id={`profileBannerUser`}>
              {(currentUser === author) && currentUser}
            </div>
        </div>
      </div>
      <div className="profileStoriesContainer">
        <h2 className="profileStoriesTitle">~ {currentUser === author ? 'My' : `${author}'s` } stories ~</h2>
        <table className="profileStoriesTable">
          <tbody className="profileStoriesTbody">
            {myStories.map((story) =>
            <table className="profileStoryTable">
              <tr className="profileStoryTr">
                <td className="profileStoryImg"><a className="storyImages" href={`/users/${story.authorId}`}><img className="storyImages" src={`${story.imageUrl}`} alt="petImage" /></a></td>
                <td className="profileStoryTd">
                    <table>
                    <tr><a className="profileStoryTitle" href={`/users/${story.authorId}`}><td className="profileStoryTitle">{story.title}</td></a></tr>
                    <tr><a className="profileStoryAuthor" href={`/users/${story.authorId}`}><td className="profileStoryAuthor">{`by ${author}`}</td></a></tr>
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
