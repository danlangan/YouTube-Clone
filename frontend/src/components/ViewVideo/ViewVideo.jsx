import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KEY } from '../../localKey';
import Comment from '../Comment/Comment';
import ViewRelatedVideos from '../ViewRelatedVideos/ViewRelatedVideos';
import { useParams, useLocation } from 'react-router-dom'

const ViewVideo = (props) => {
    const { videoId } = useParams();
    const { state } = useLocation();
    const [video, setVideo] = useState({});
    console.log(state);

    async function fetchVideo(){
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos/${props.videoId}&key=${KEY}&type=video&maxResults=5&part=snippet`);
            setVideo(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    
    useEffect(() => {
        fetchVideo(video);
    }, [videoId]);

    return (
        <div className='video'>
            <div>
                <h1> {video.title}</h1>
            <iframe title={video.title} className="iframe" src={`https://www.youtube.com/embed/${videoId}`}
            ></iframe>
            <h3>{video.description}</h3>
            <Comment/>
            </div>
            <br></br>
            <div><ViewRelatedVideos/></div>
        </div>
    );

};
export default ViewVideo;