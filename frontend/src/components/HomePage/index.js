import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import { useLocation, Redirect } from 'react-router-dom';

import { getStories } from '../../store/stories';
// import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);
    const randomStoriesArr = storiesArr.sort(() => 0.5 - Math.random());
    let fourRandomStories = randomStoriesArr.slice(0, 4);

  const users = useSelector((state) => state.users);
  const usersArr = Object.values(users);

  const session = useSelector((state) => state.session);
  const sessionArr = Object.values(session);


  useEffect(() => {
    dispatch(getStories());
    // dispatch(getUsers());
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <>
      <div className="container" style={{backgroundImage: 'url(/images/heroimage.png)', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div className="darkOverlay">
            <div id='line1'>
              a place for pet-lovers...
              <div id='line2'>What's your story?</div>
            </div>
        </div>
      </div>
      <div className="homeStoriesContainer">
        <h2 className="homeStoriesTitle">~ See what others are sharing ~</h2>
        <table className="homeStoriesTable">
          <tbody className="homeStoriesTbody">
            {fourRandomStories.map((story) =>
            <table className="homeStoryTable">
              <tr className="homeStoryTr">
                <td className="homeStoryImg"><a className="storyImages" href={`/users/${story.authorId}`}><img className="storyImages" src={`${story.imageUrl}`} alt="petImage" /></a></td>
                <td className="homeStoryTd">
                    <table>
                    <tr><a className="homeStoryTitle" href={`/users/${story.authorId}`}><td className="homeStoryTitle">{story.title}</td></a></tr>
                    <tr><a className="homeStoryAuthor" href={`/users/${story.authorId}`}><td className="homeStoryAuthor">{`by ${usersArr.find(user => user.id === story.authorId)?.username}`}</td></a></tr>
                    <tr><td className="homeStoryBody">{story.body}</td></tr>
                    </table>
                </td>
              </tr>
            </table>)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default HomePage;
