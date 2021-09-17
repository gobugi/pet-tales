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
  const userId = location.pathname.split('/').pop(-1);

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
              {`welcome`}
            </div>
        </div>
      </div>
      <div className="profileStoriesContainer">
        <h2 className="profileStoriesTitle">~ My stories ~</h2>
        <table className="profileStoriesTable">
          <tbody className="profileStoriesTbody">
            {myStories.map((story) =>
            <table className="profileStoryTable">
              <tr className="profileStoryTr">
                <td className="profileStoryImg"><img className="storyImages" src={`${story.imageUrl}`} alt="petImage" /></td>
                <td className="profileStoryTd">
                    <table>
                    <tr><td className="profileStoryTitle">{story.title}</td></tr>
                    <tr><td className="profileStoryAuthor">{`by ${usersArr[+userId - 1]?.username}`}</td></tr>
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














// function ProfilePage({ user }) {
//   const dispatch = useDispatch();
//   const [showForm, setShowForm] = useState(false);

//   const sessionUser = useSelector(state => state.session.user);
//   const [credential, setCredential] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState([]);

//   const openForm = () => {
//     if (showForm) return;
//     setShowForm(true);
//   };

//   useEffect(() => {
//     if (!showForm) return;

//     const closeForm = () => {
//       setShowForm(false);
//     };

//     document.addEventListener('click', closeForm);

//     return () => document.removeEventListener("click", closeForm);
//   }, [showForm]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.login({ credential, password }))
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) setErrors(data.errors);
//       });
//   }

//   return (
//     <>

//     </>

//     // <div className='formContainer'>
//     //   <form onSubmit={handleSubmit}>
//     //     <ul>
//     //       {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//     //     </ul>
//     //     <div>
//     //       <label>
//     //         Title
//     //         <input
//     //           type="text"
//     //           // value={credential}
//     //           // onChange={(e) => setCredential(e.target.value)}
//     //           required
//     //         />
//     //       </label>
//     //     </div>
//     //     <div>
//     //       <label>
//     //         Comment
//     //         <textarea
//     //           // type="text"
//     //           // value={password}
//     //           // onChange={(e) => setPassword(e.target.value)}
//     //           rows="5"
//     //           cols="33"
//     //           required
//     //         />
//     //       </label>
//     //     </div>
//     //     <button type="submit">Submit</button>
//     //   </form>
//     // </div>
//   );
// }

export default ProfilePage;
