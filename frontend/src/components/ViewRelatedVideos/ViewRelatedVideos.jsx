import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { KEY } from '../../localKey'


function ViewRelatedVideos() {

    const [relatedVideos, setRelatedVideos] = useState(`${video.videoId}`)

    async function fetchRelatedVideos(){
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&key=${KEY}&type=video&maxResults=5&part=snippet`);
            mapRelatedVideos(response.data);
        } catch (error) {
            console.log(error.message);
        }};

        useEffect(() => {
            let mounted = true;
            if(mounted){
                setRelatedVideos();
            };
        })

        function mapRelatedVideos(){

            return relatedVideos.map(relatedVideo =>
                <relatedVideo
                key={relatedVideo.videoId}
                title={relatedVideo.title}
                description={relatedVideo.description}
                />)
        };

    return (
        <div className='relatedVideos'>
            <table>
                <thead>
                    Related Videos
                </thead>
                <tbody>
                    {props.relatedVideos.map((relatedVideo) => {
                    return (
                <tr>
                    {relatedVideo.title}
                    {relatedVideo.thumbnail.default}
                </tr>
                        )})};
                </tbody>
            </table>
        </div>
    )
};
export default ViewRelatedVideos;
