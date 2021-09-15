import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
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
      <div className='homeStoriesContainer'>
        
      </div>
    </>
  )
}






export default HomePage;
