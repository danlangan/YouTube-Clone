// General Imports
import { Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import "./App.css";
import axios from 'axios';

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Comment from './components/Comment/Comment';
import ViewVideo from "./components/ViewVideo/ViewVideo";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App(props) {
  const [videoSearch, setVideoSearch] = useState(``);

  

  

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
