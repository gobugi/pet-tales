import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import { useLocation, Redirect } from 'react-router-dom';

import { getStories } from '../../store/stories';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);

  useEffect(() => {
    dispatch(getStories());
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
              <th>Title</th>
              <th>Author</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody className="homeStoriesTbody">
            {storiesArr.map((story) => <tr><td><img src={`${story.imageUrl}`} alt="petImage" /></td><td>{story.title}</td><td>{story.body}</td><td>{story.authorId}</td></tr>)}
            <img src="https://images.unsplash.com/photo-1488015795646-7e22a773d72a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80" alt="petImage" />

          </tbody>
        </table>
      </div>
    </>
  )
}

export default HomePage;
