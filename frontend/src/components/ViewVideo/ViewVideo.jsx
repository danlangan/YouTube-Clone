import React, { useState } from 'react';
import axios from 'axios';

const [video, seeVideo] = useState([])

const ViewVideo = async () => {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q={SEARCH QUERY HERE}&key=AIzaSyDdEHMH6ijhDun3kNDmWuWh1jUCbr0WOjI`);
        seeVideo(response.data);
    } catch (error) {
        console.log(error.message);
    }
    return (
        <div className='video'>


        </div>
    );
};

export default ViewVideo;