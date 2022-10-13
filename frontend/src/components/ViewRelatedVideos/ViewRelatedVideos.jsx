import axios from 'axios';
import React, { useState } from 'react';
import { KEY } from '../../localKey'


const ViewRelatedVideos = (props) => {

const [relatedVideos, setRelatedVideos] = useState(`${video.video_id}`)

async () => {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${relatedVideos}&key=${KEY}`);
        setRelatedVideos(response.data);
    } catch (error) {
        console.log(error.message);
    }
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
    )}

export default ViewRelatedVideos;
