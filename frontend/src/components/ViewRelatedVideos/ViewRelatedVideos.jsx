import axios from 'axios';
import React, { useState } from 'react';
import { KEY } from '../../localKey'


const ViewRelatedVideos = (props) => {

const [relatedVideos, setRelatedVideos] = useState(`${video.videoId}`)

async () => {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&key=${KEY}&type=video&maxResults=5&part=snippet`);
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
