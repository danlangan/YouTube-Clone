import React, { useState } from 'react';
import axios from 'axios';
import { KEY } from '../localKey';
import Comment from './Comment'

const [video, setVideo] = useState([])

const ViewVideo = async () => {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${user.search}&key=${KEY}`);
        setVideo(response.data);
    } catch (error) {
        console.log(error.message);
    }};
    
    return (
        <div className='video'>
            <iframe className="iframe" src={`https://www.youtube.com/embed/${props.videoObj.id.videoId}`}
            ></iframe>
            <Comment/>

        </div>
    );

export default ViewVideo;