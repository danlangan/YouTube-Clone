import React, { useState } from 'react';
import axios from 'axios';
import { KEY } from '../../localKey';
import Comment from '../Comment/Comment';
import ViewRelatedVideos from '../ViewRelatedVideos/ViewRelatedVideos';

const [video, setVideo] = useState([{searchTerm}])

const ViewVideo = async () => {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${video}&key=${KEY}`);
        setVideo(response.data);
    } catch (error) {
        console.log(error.message);
    };

    
    return (
        <div className='video'>
            <div>
            <iframe className="iframe" src={`https://www.youtube.com/embed/${props.videoObj.id.videoId}`}
            ></iframe>
            <Comment/>
            </div>
            <br></br>
            <div><ViewRelatedVideos/></div>
        </div>
    )};

export default ViewVideo;