import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { KEY } from '../../localKey'
import { useParams, useNavigate, Link } from "react-router-dom";

const ViewRelatedVideos = () => {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const [relatedVideos, setRelatedVideos] = useState([]);
    

    useEffect(() => {
        let mounted = true;
        if(mounted){
            fetchRelatedVideos(videoId);
        };
        return () => mounted = false;
    }, [videoId])
  
    async function fetchRelatedVideos(videoId=videoId){
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&key=${KEY}&type=video&maxResults=5&part=snippet/`);
            setRelatedVideos(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        };
     };

     const handleClick = (relatedVideo) => {
        navigate(`viewvideo/${relatedVideo.videoId}`,{
            state: {
                title: relatedVideo.snippet.title,
                description: relatedVideo.snippet.description
            }
        })
     };

    return (
        <div className='related-videos'>
            <h2>Related Videos</h2>
            <ul>
                {relatedVideos ? (relatedVideos.map((relatedVideo, index) => {
                return (
                <li key={index}>
                    <div className="related-title">
                    {relatedVideo.snippet.title}
                    {relatedVideo.snippet.thumbnails.default}
                    </div>
                    <div className="related-thumbnail"> 
                    <Link onClick={(event) => handleClick(event)} to={`/viewvideo/${relatedVideo.videoId}`}>
                    <img src={relatedVideo.items.snippet.thumbnails.default.url} alt='related video thumbnail'/>
                    </Link>
                    </div>
                </li>
                )})):(<div>No Related Videos</div>)}
            </ul>
        </div>
    )
};

export default ViewRelatedVideos;