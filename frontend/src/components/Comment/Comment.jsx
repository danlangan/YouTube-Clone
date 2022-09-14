import React, { useState, useEffect } from "react";
import axios from "axios";

const [comments, seeComment] = useState([])

useEffect(() => {
    setComment();
}, []);

const setComment = async () => {
    try{
        let response = await axios.get('insert url here'
        );
        seeComment(response.data);
    } catch (error) {
        console.log(error.message);
    }
};