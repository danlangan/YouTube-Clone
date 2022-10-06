import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { KEY } from '../localKey '

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth(); // this will be needed on your video player page to get user info
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("leonel messi highlights");


  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${KEY}`);
        setVideos(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchSearchResults();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {videos &&
        videos.map((video) => (
          <p key={video.videoid}>
            {video.name} {video.discripion}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
