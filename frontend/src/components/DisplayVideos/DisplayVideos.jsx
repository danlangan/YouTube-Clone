import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KEY } from '../localKey';

const [videos, setVideos] = useState([]);
const [searchTerm, setSearchTerm] = useState('leo messi highlights');



const DisplayVideos = (props) => {

async () => {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${KEY}`);
        setVideos(response.data);
    } catch (error) {
        console.log(error.message);
    }};

    function displaySearchResults(event) {
        event.preventDefault();
        let response = props.videos.filter((video) => {
            if (video.title.includes(searchTerm)||
                video.description.includes(searchTerm)) {
                    return true;
                } else {
                    return false;
                }
        });
        props.setSearchTerm(response);
    }

    return (
        <div className='relatedVideos'>
            <table>
                <thead>
                <tr>
                    Videos
                </tr>
                </thead>
                <tbody>
                    {props.videos.map((video) => {
                    return (
                        <tr>
                            <td>{props.video.title}</td>
                            <td>{props.video.description}</td>
                        </tr>
                        )})};
                </tbody>
            </table>
        </div>
    )};

    export default DisplayVideos;