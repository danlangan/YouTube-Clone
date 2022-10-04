// General Imports
import { Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import "./App.css";
import { KEY } from './localKey';
import axios from 'axios';

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Comment from './components/Comment/Comment';

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App(props) {
  const [comments, setComments] = useState([]);
  const [videoSearch, setVideoSearch] = useState(``);

  async function fetchComments(){
    let response = await axios.get(`enter in the URL for the api here${videoSearch}`);
    setComments(response.data.results);
  }

  function mapComments(){
    return comments.map(comment => 
      <Comment
      key={comment.video_id}
      comment={comment}
      />
    )
  }

  useEffect(() => {
    let mounted = true;
    if(mounted){
      fetchComments();
    }
    return () => mounted = false;
  })
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
