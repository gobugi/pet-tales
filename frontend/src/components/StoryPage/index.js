import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { NavLink, useParams, useLocation, useHistory, Redirect } from 'react-router-dom';
import { getStories, deleteStory } from '../../store/stories'
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';
import { getComments } from '../../store/comments';
import StoryFormPage from '../StoryFormPage';
import './StoryPage.css';
import { csrfFetch } from "../../store/csrf";

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

  const [allLikes, setAllLikes] = useState([]);
  const [currentLike, setCurrentLike] = useState([]);

//////////////// display total likes and relevant heart ///////////////////
  useEffect(() => {
    async function all_likes() {
			const response = await fetch(`/api/likes/`);
			const responseData = await response.json();

      const currStoryLikesArr = [];
      responseData?.forEach(like => {
        like?.storyId === id && currStoryLikesArr?.push(like)

        if (like?.storyId === id && like?.userId === currentUserId) {
          setCurrentLike(like);
        }
      })

      setAllLikes(currStoryLikesArr);

        const checkLikedArr = [];
        currStoryLikesArr?.forEach(like => {
          if (like?.userId === sessionUser?.id) {
            document.getElementById("loggedFullHeart")?.setAttribute("style","display:block;");
            document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
            document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
            document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
            checkLikedArr?.push(like)
          }
        })

        if (!checkLikedArr?.length) {
          document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:block;");
          document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
          document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
          document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
        }

      if (sessionUser === undefined && !currStoryLikesArr?.length) {
        document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:block;");
        document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
      }

      if (sessionUser === undefined && currStoryLikesArr?.length) {
        document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:block;");
        document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
      }

		}
    all_likes();
	}, []);

  /////////// add heart ////////////

  const addLike = async (e) => {
    e.preventDefault()

    const newLike = {
      "userId": currentUserId,
      "storyId": id
    }

    const response = await fetch(`/api/likes/`, {
      method: 'POST',
      body: JSON.stringify(newLike),
      headers: {
        "Content-Type": "application/json"
      }

    });


    if (response.ok) {
      document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
      document.getElementById("loggedFullHeart")?.setAttribute("style","display:block;");
    }



    async function all_likes() {
      const response = await fetch(`/api/likes/`);
      const responseData = await response.json();

      const currStoryLikesArr = [];
      responseData?.forEach(like => {
        like?.storyId === id && currStoryLikesArr?.push(like)

        if (like?.storyId === id && like?.userId === currentUserId) {
          setCurrentLike(like);
        }

      })

      setAllLikes(currStoryLikesArr);

        const checkLikedArr = [];
        currStoryLikesArr?.forEach(like => {
          if (like?.userId === sessionUser?.id) {
            document.getElementById("loggedFullHeart")?.setAttribute("style","display:block;");
            document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
            document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
            document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
            checkLikedArr?.push(like)
          }
        })

        if (!checkLikedArr?.length) {
          document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:block;");
          document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
          document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
          document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
        }

      if (sessionUser === undefined && !currStoryLikesArr?.length) {
        document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:block;");
        document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
      }

      if (sessionUser === undefined && currStoryLikesArr?.length) {
        document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:block;");
        document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
      }

		}
    all_likes();

  }


  const remLike = async (e) => {
    e.preventDefault();
    await fetch(`/api/likes/${currentLike?.id}`, {
        method: 'DELETE'
    })

    setCurrentLike([]);

    async function all_likes() {
      const response = await fetch(`/api/likes/`);
      const responseData = await response.json();

      const currStoryLikesArr = [];
      responseData?.forEach(like => {
        like?.storyId === id && currStoryLikesArr?.push(like)

        if (like?.storyId === id && like?.userId === currentUserId) {
          setCurrentLike(like);
        }

      })

      setAllLikes(currStoryLikesArr);

        const checkLikedArr = [];
        currStoryLikesArr?.forEach(like => {
          if (like?.userId === sessionUser?.id) {
            document.getElementById("loggedFullHeart")?.setAttribute("style","display:block;");
            document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
            document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
            document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
            checkLikedArr?.push(like)
          }
        })

        if (!checkLikedArr?.length) {
          document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:block;");
          document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
          document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
          document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
        }

      if (sessionUser === undefined && !currStoryLikesArr?.length) {
        document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:block;");
        document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
      }

      if (sessionUser === undefined && currStoryLikesArr?.length) {
        document.getElementById("loggedOutFullHeart")?.setAttribute("style","display:block;");
        document.getElementById("loggedOutEmptyHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedFullHeart")?.setAttribute("style","display:none;");
        document.getElementById("loggedEmptyHeart")?.setAttribute("style","display:none;");
      }

		}
    all_likes();

  };







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
                    <tr>
                      <a className="smallStoryAuthor" href={`/users/${userId}`}>
                        <td className="smallStoryAuthor">{`by ${currentUser?.username}`}</td>
                      </a>
                    </tr>
                    <tr><td className="smallStoryBody">{`${currentStory?.body}`}</td></tr>
                    <br />
                    <tr className="likesContainer">
                      <i className="far fa-heart" id="loggedEmptyHeart" onClick={addLike} style={{display:"none"}}></i>
                      <i className="fas fa-heart" id="loggedFullHeart" onClick={remLike} style={{display:"none"}}></i>
                      <i className="far fa-heart" id="loggedOutEmptyHeart" style={{display:"none"}}></i>
                      <i className="fas fa-heart" id="loggedOutFullHeart" style={{display:"none"}}></i>
                      <span>{'\u00A0\u00A0'}{` ${allLikes?.length} ${allLikes?.length === 1 ? "like" : "likes"}`}</span>
                    </tr>
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
