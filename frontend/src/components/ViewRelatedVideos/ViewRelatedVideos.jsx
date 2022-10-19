import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { KEY } from '../../localKey'


const ViewRelatedVideos = (props) => {
    const [relatedVideos, setRelatedVideos] = useState(`${props.videoId}`)

    useEffect(() => {
        let mounted = true;
        if(mounted){
            fetchRelatedVideos();
        };
    })
  
    async function fetchRelatedVideos(){
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${props.videoId}&type=video&key=${KEY}&type=video&maxResults=5&part=snippet`);
            console.log(response.data);
            if (response.status === 201){
            setRelatedVideos(response.data);
        }
        } catch (error) {
            console.log(error.message);
        }; 
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
                    <img src={relatedVideo.thumbnail.default.url} alt='related video thumbnail'/>
                    </div>
                </li>
                )})};
            </ul>
        </div>
    )
};
export default ViewRelatedVideos;
