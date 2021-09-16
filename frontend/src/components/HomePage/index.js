import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import { useLocation, Redirect } from 'react-router-dom';

import { getStories } from '../../store/stories';
import { getUsers } from '../../store/users';
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
    dispatch(getUsers());
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
        <table className="homeStoriesTable">
          <thead className="homeStoriesThead">
            <tr>
              <th>See what others are sharing</th>
            </tr>
          </thead>
          <tbody className="homeStoriesTbody">
            {fourRandomStories.map((story) =>
            <tr>
              <td>
                <img className="storyImages" src={`${story.imageUrl}`} alt="petImage" />
              </td>
              <td>{story.title}</td>
              <td>{usersArr.find(user => user.id === story.authorId)?.username}</td>
              <td>{story.body}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default HomePage;
