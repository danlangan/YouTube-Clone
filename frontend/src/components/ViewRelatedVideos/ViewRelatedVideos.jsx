import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { KEY } from '../../localKey'
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

const ViewRelatedVideos = (props) => {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const { state } = useLocation();
    const [relatedVideos, setRelatedVideos] = useState([]);
    console.log(state)
    

    useEffect(() => {
        let mounted = true;
        if(mounted){
            fetchRelatedVideos(); // this might be doing too much by passing in the videoId state variable.
        };
        return () => mounted = false;
    }, [])
  
    async function fetchRelatedVideos(){
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&key=${KEY}&type=video&maxResults=5&part=snippet`);
            console.log(response.data);
            if (response.status === 201){
            setRelatedVideos(response.data);
        }
        } catch (error) {
            console.log(error.message);
        }; 
     };

     const handleClick = (relatedVideo) => {
        navigate(`ViewVideo/${relatedVideo.videoId}`, {
            state: {
                title: relatedVideo.title,
                description: relatedVideo.description
            }
        })
     };

    return (
        <div className='related-videos'>
            <h2>Related Videos</h2>
            <ul>
                {relatedVideos.map((relatedVideo, index) => {
                return (
                <li key={index}>
                    <div className="related-title">
                    {relatedVideo.snippet.title}
                    </div>
                    <div className="related-thumbnail"> 
                    <Link to={`/ViewVideo/${relatedVideo.id.videoId}`}>
                    <img src={relatedVideo.snippet.thumbnails.default.url} alt='related video thumbnail'/>
                    </Link>
                    </div>
                </li>
                )})}
            </ul>
        </div>
    )
};

export default ViewRelatedVideos;
