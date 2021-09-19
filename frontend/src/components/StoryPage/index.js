import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, Route, useParams, useLocation } from 'react-router-dom';
import EditStoryForm from "../EditStoryForm";
import { getStory } from '../../store/stories'
import './StoryPage.css';



import { getComments } from '../../store/comments';
import StoryFormPage from '../StoryFormPage';
// import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';

const StoryPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const story = useSelector(state => state.stories[id]);


  // const stories = useSelector((state) => {
  //   return state.stories.list.map(storyId => state.stories[storyId]);
  // });
  // const stories = useSelector((state) => state.stories);
  // const storiesArr = Object.values(stories);


  // const users = useSelector((state) => state.users);
  // const usersArr = Object.values(users);

  // const session = useSelector((state) => state.session);
  // const sessionArr = Object.values(session);

  // const location = useLocation();
  // const storyId = location?.pathname.split('/').pop(-1);
  // const title = storiesArr[+storyId - 1]?.title

  // const currentStory = storiesArr.filter((story) => story.id === +storyId)

  useEffect(() => {
    dispatch(getStory(id));
    // dispatch(getUsers());
    // dispatch(restoreUser());
  }, [dispatch, id]);

  // if (!story) {
  //   return null;
  // }


  return (

    // <div className='storyDiv'>
    //   <div className="storyBanner" style={{backgroundImage: 'url(/images/storybanner.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
    //     <div className="storyDarkOverlay">
    //         {/* <div id={`storyWelcome`}>
    //           {(currentUser === author) && `Welcome`}
    //         </div>
    //         <div id={`storyUser`}>
    //           {(currentUser === author) && currentUser}
    //         </div> */}
    //     </div>
    //   </div>
    //   <div className="storyContainer">
    //     {/* <h2 className="storyTitle">~ {currentUser === author ? 'My' : `${author}'s` } story ~</h2> */}
    //       <ul>
    //         <li>
    //           <b>Image</b> {stories.imageUrl}
    //         </li>
    //         <li>
    //           <b>Title</b> {stories.title}
    //         </li>
    //         <li>
    //           <b>Body</b> {stories.body}
    //         </li>
    //         <li>
    //           <b>Last Updated</b> {stories.updatedAt}
    //         </li>
    //       </ul>
    //     <table className="storyTable">
    //       <tbody className="storyTbody">
    //         {/* {myStories.map((story) =>
    //         <table className="storyTable">
    //           <tr className="storyTr">
    //             <td className="storyImg"><a className="storyImages" href={`/users/${story.authorId}`}><img className="storyImages" src={`${story.imageUrl}`} alt="petImage" /></a></td>
    //             <td className="storyTd">
    //                 <table>
    //                 <tr><a className="storyTitle1" href={`/users/${story.authorId}`}><td className="storyTitle1">{story.title}</td></a></tr>
    //                 <tr><a className="storyAuthor1" href={`/users/${story.authorId}`}><td className="storyAuthor1">{`by ${author}`}</td></a></tr>
    //                 <tr><td className="storyBody1">{story.body}</td></tr>
    //                 </table>
    //             </td>
    //           </tr>
    //         </table> */}
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <>
      <h2>Hello</h2>
      <h2>Hello</h2>
      <h2>Hello</h2>
      <h2>Hello</h2>
    </>
  )
}


export default StoryPage;
