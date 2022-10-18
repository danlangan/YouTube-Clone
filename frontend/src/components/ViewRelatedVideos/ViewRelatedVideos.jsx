import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { KEY } from '../../localKey'


const ViewRelatedVideos = (props) => {

    useEffect(() => {
        let mounted = true;
        if(mounted){
            fetchRelatedVideos();
        };
    })

    const [relatedVideos, setRelatedVideos] = useState(`${props.videoId}`)

    async function fetchRelatedVideos(){
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${props.videoId}&type=video&key=${KEY}&type=video&maxResults=5&part=snippet`);
            console.log(response.data);
            if (response.status === 201){
            setRelatedVideos(response.data);
        }
            mapRelatedVideos(response.data);
        } catch (error) {
            console.log(error.message);
        }; 
     };

        function mapRelatedVideos(){

            return relatedVideos.map(relatedVideo =>
                <relatedVideo
                key={relatedVideo.videoId}
                title={relatedVideo.title}
                description={relatedVideo.description}
                />)
        };

    return (
        <div className='related-videos'>
            <table>
                <thead>
                    Related Videos
                </thead>
                
                    {props.relatedVideos.map((relatedVideo) => {
                    return (
                <tr>
                    {relatedVideo.title}
                    {relatedVideo.thumbnail.default}
                </tr>
                        )})};
            </table>
        </div>
    )
};
export default ViewRelatedVideos;
