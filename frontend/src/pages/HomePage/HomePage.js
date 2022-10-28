import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { KEY } from '../../localKey';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css'

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

    async function fetchSearchResults(query="axios post to local server with id") {
      try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${query}&key=${KEY}&type=video&maxResults=5&part=snippet`);
        setVideos(response.data.items);
        console.log(response.data.items)
      } catch (error) {
        console.log(error.message);
      }
    };

      const handleClick = (video) => {
        navigate(`viewvideo/${video.videoId}`, {
          state: {
            title: video.title,
            description: video.description
          }
        })
      };
      function handleSubmit(event) {
        event.preventDefault();
        fetchSearchResults(query)
      }

  return (
    <div className="container">
      <form  onSubmit={handleSubmit}> 
        <input type='search' placeholder='Click Here for YouTube Search' value={query} onChange={(event) => setQuery(event.target.value)} />
        <br></br>
        <button type='submit'>Search</button>
      </form>
        
      <h1>Home Page for {user.username}!</h1>
      <br></br>
      <ul className="display-videos">
      {videos.map((video, index) => {
          return (
            <li key={index}>
            <div className="video-title">
            {video.snippet.title}
            </div><div className="video-description"> 
            {video.snippet.discripion} 
            </div>
            <Link to={`/viewvideo/${video.id.videoId}`}>
            <img src={video.snippet.thumbnails.medium.url} alt='thumbnail tag for the video'/>
            </Link>
            </li>
          )
        })}
        </ul>
        <br></br>
    </div>
  );
};

export default HomePage;  