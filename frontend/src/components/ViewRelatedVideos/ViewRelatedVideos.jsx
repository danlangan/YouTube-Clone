import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { KEY } from '../../localKey'
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

const ViewRelatedVideos = () => {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const { state } = useLocation();
    const [relatedVideos, setRelatedVideos] = useState([]);
    console.log(state)
    

    useEffect(() => {
        let mounted = true;
        if(mounted){
            fetchRelatedVideos();
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
        navigate(`viewvideo/${relatedVideo.videoId}`, {
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
                    {relatedVideo.snippet.thumbnails.default}
                    </div>
                    <div className="related-thumbnail"> 
                    <Link onClick={(event) => handleClick(event)} to={`/viewvideo/${relatedVideo.id.videoId}`}>
                    <img src={relatedVideo.items.snippet.thumbnails.default.url} alt='related video thumbnail'/>
                    </Link>
                    </div>
                </li>
                )})}
            </ul>
        </div>
    )
};

export default ViewRelatedVideos;
