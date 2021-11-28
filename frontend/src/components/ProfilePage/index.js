import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { Redirect, useLocation, NavLink } from 'react-router-dom';
import './ProfilePage.css';


import { getStories } from '../../store/stories';
import { getUsers } from '../../store/users';
import { restoreUser } from '../../store/session';
import { csrfFetch } from "../../store/csrf";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);

  const sessionUser = useSelector(state => state.session.user);

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

  const [allFollows, setAllFollows] = useState([]);
  const [currentFollow, setCurrentFollow] = useState([]);
  const [followingUsernames, setFollowingUsernames] = useState([]);
  const [followerUsernames, setFollowerUsernames] = useState([]);



  useEffect(() => {

    async function all_follows() {

			const res = await fetch(`/api/users/`);
			const resData = await res.json();

      const followingUserIdsArr = [];
      const followerUserIdsArr = [];

			const response = await fetch(`/api/follows/`);
			const responseData = await response.json();



/////////////////////////////////////////////////////////

      responseData?.forEach(follow => {
        if (follow?.followerId === +userId) {
          followingUserIdsArr?.push(follow?.userId)
        }
      })

      const followingUsernamesArr = [];
      resData?.forEach(user => {
        if (followingUserIdsArr?.includes(user?.id)) {
          followingUsernamesArr?.push(user)
        }
      });


      setFollowingUsernames(followingUsernamesArr?.sort(function(a, b) {
        return a?.username?.toLowerCase()?.localeCompare(b?.username?.toLowerCase());
      }))

////////////////////////////////////////////////////
////////////////////////////////////////////////////
      responseData?.forEach(follow => {
        if (follow?.userId === +userId) {
          followerUserIdsArr?.push(follow?.followerId)
        }
      })

      const followerUsernamesArr = [];
      resData?.forEach(user => {
        if (followerUserIdsArr?.includes(user?.id)) {
          followerUsernamesArr?.push(user)
        }
      });

      setFollowerUsernames(followerUsernamesArr?.sort(function(a, b) {
        return a?.username?.toLowerCase()?.localeCompare(b?.username?.toLowerCase());
      }))
////////////////////////////////////////////////////



      setAllFollows(responseData)

      const currFollowArr = [];

      responseData?.forEach(follow => {
        (+userId === follow?.userId) && (sessionUser?.id === follow?.followerId) && currFollowArr?.push(follow);
      })
      setCurrentFollow(currFollowArr[0]);

      if (!sessionUser) {
        document.getElementById("followBtn")?.setAttribute("style","display:none;");
        document.getElementById("unfollowBtn")?.setAttribute("style","display:none;");
      }

      if (sessionUser && currFollowArr?.length) {
        document.getElementById("followBtn")?.setAttribute("style","display:none;");
        document.getElementById("unfollowBtn")?.setAttribute("style","display:block;");
      }

      if (sessionUser && !currFollowArr?.length) {
        document.getElementById("followBtn")?.setAttribute("style","display:block;");
        document.getElementById("unfollowBtn")?.setAttribute("style","display:none;");
      }

		}

    all_follows();
	}, [currentFollow]);




  //////////////// add follow ///////////////////
  const addFollow = async (e) => {
    e.preventDefault()

    const newFollow = {
      userId,
      "followerId": currentUserId
    }

    const response = await csrfFetch(`/api/follows/`, {
      method: 'POST',
      body: JSON.stringify(newFollow),
      headers: {
        "Content-Type": "application/json"
      }
    });


    if (response.ok) {

      const data = await response.json();
      setCurrentFollow(data)

      const res = await fetch(`/api/follows/`);
			const resData = await res.json();

      setAllFollows(resData)

      document.getElementById("followBtn")?.setAttribute("style","display:none;");
      document.getElementById("unfollowBtn")?.setAttribute("style","display:block;");

    }

  }


//////////////// remove follow ///////////////////
const remFollow = async (e) => {
  e.preventDefault();

  const resp = await csrfFetch(`/api/follows/${currentFollow?.id}`, {
    method: 'DELETE'
  });

  if (resp.ok) {
    document.getElementById("followBtn")?.setAttribute("style","display:block;");
    document.getElementById("unfollowBtn")?.setAttribute("style","display:none;");
  }
};




  useEffect(() => {
    dispatch(getStories());
    dispatch(getUsers());
    dispatch(restoreUser());
  }, [dispatch]);


  return (
    <div className='profileDiv'>
      <div className="profileBanner" style={{backgroundImage: 'url(https://raw.githubusercontent.com/gobugi/pet-tales/main/frontend/public/images/profilebanner.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
        <div className="bannerDarkOverlay">
            <div id={`welcome`}>
              {(currentUserId === +userId) && `Welcome`}
            </div>
            <div id={`profileBannerUser`}>
              {(currentUserId === +userId) && currentUser}
            </div>
        </div>
      </div>

      {currentUserId === +userId &&
          <div id="followDivContainer">
            {/* <span id="followingDiv">
              {!followingUsernames?.length && <strong>- </strong>}
              <strong>Following - </strong>
              {followingUsernames?.map((usr, i) => (i === followingUsernames?.length - 1 ? `${usr?.username}` : `${usr?.username}, `))}
            </span>
            <span id="followersDiv">
              {!followerUsernames?.length && <strong>- </strong>}
              <strong>Followers - </strong>
              {followerUsernames?.map((usr, i) => (i === followerUsernames?.length - 1 ? `${usr?.username}` : `${usr?.username}, `))}
            </span> */}

            <span id="followingSpan">
              {!followingUsernames?.length && <strong>-</strong>}
              {!followingUsernames?.length && ' 0'}
              <strong> Following - </strong>
              {followingUsernames?.map((user, i) => (
                i === followingUsernames?.length - 1 ? <a href={`/users/${user?.id}`}>{user?.username}</a> : <a href={`/users/${user?.id}`}>{user?.username}, </a>
              ))}
            </span>

            <span id="followersSpan">
              {!followerUsernames?.length && <strong>-</strong>}
              {!followerUsernames?.length && ' 0'}
              <strong> Followers - </strong>
              {followerUsernames?.map((user, i) => (
                i === followerUsernames?.length - 1 ? <a href={`/users/${user?.id}`}>{user?.username}</a> : <a href={`/users/${user?.id}`}>{user?.username}, </a>
              ))}
            </span>

          </div>
      }

      <div className="profileStoriesContainer">
        <h2 className="profileStoriesTitle">~ {currentUserId === +userId ? 'My' : `${author}'s` } stories ~</h2>

        {currentUserId !== +userId &&
          <button id="followBtn" onClick={addFollow} style={{display:"none"}}>Follow</button>
        }
        {currentUserId !== +userId &&
          <button id="unfollowBtn" onClick={remFollow} style={{display:"none"}}>Unfollow</button>
        }
        {currentUserId !== +userId &&
          <br />
        }
        {currentUserId !== +userId &&
          <hr />
        }
        {currentUserId !== +userId &&
          <br />
        }
        {currentUserId !== +userId &&
          <br />
        }

        {(currentUserId === +userId) &&
        <NavLink id="newStoryNav" to='/stories/new'>
          <i className="fas fa-plus-circle fa-3x">
            <span id="newStory"> New story</span>
          </i>
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
