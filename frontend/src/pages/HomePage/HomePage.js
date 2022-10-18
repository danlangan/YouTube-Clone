import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { KEY } from '../../localKey';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth(); // this will be needed on your video player page to get user info
  const [comments, setComments] = useState([])
  // const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try{
        let response = await axios.get('http://127.0.0.1:8000/api/comments', {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchComments();
  }, [token]);

    async function fetchSearchResults(searchTerm="leonel messi highlights") {
      try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${KEY}&type=video&maxResults=5&part=snippet`);
        setVideos(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    
    useEffect(() => {
      fetchSearchResults();
      }, [token]);

      const handleClick = (video) => {
        navigate(`viewvideo/${video.videoId}`, {
          state: {
            title: video.title,
            description: video.description
          }
        })
      };
      function displaySearchResults(event) {
        event.preventDefault();
        let response = videos.filter((video) => {
            if (video.title.includes(searchTerm)||
                video.description.includes(searchTerm)) {
                    return true;
                } else {
                    return false;
                }
        });
        event.setVideos(response);
    }

  return (
    <div className="container">
      <form onSubmit={displaySearchResults}>
        <input type='text' placeholder='Click Here for YouTube Search' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
        <button type='submit'>Search</button>
      </form>
      <h1>Home Page for {user.username}!</h1>
      <br></br>
      <ul>
      {videos && videos.map((video => {
          return (
            <li key={video.videoId}>
            {video.title} {video.discripion}
            onClick={(video) => handleClick(video)}
              <Link to={`viewvideo/${video.videoId}`}></Link>
            </li>
          )
        }))};
        </ul>
    </div>
  );
};

export default HomePage;
