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
  // const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([])
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchSearchResults();
      }
    }, [token]);

    async function fetchSearchResults(query="leonel messi highlights") {
      try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${query}&key=${KEY}&type=video&maxResults=5&part=snippet`);
        setVideos(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

      const handleClick = (video) => {
        navigate(`ViewVideo/${video.videoId}`, {
          state: {
            title: video.title,
            description: video.description
          }
        })
      };
      function displaySearchResults(event) {
        event.preventDefault();
        let response = videos.filter((video) => {
            if (video.title.includes(query)||
                video.description.includes(query)) {
                    return true;
                } else {
                    return false;
                }
        }); return response.data
      }

  return (
    <div className="container">
        <input type='search' placeholder='Click Here for YouTube Search' value={query} onChange={(event) => setQuery(event.target.value)} onSubmit={displaySearchResults} />
        <button type='submit'>Search</button>
      <h1>Home Page for {user.username}!</h1>
      <br></br>
      <ul>
      {videos && videos.map((video => {
          return (
            <li key={video.videoId}>
            {video.title} {video.discripion}
            onClick={(video) => handleClick(video)}
              <Link to={`ViewVideo/${video.videoId}`}></Link>
            </li>
          )
        }))}
        </ul>
    </div>
  );
};

export default HomePage;
