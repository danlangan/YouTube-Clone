import React, { useState, useEffect } from "react";
import axios from "axios";
import { KEY } from '../localKey';

const [comments, setComments] = useState([])

useEffect(() => {
    setComments();
}, []);

async function fetchComments(){
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${video_id}&key=${KEY}`);
    setComments(response.data.results);
};

function mapComments(){
    return comments.map(comment => 
      <Comment
      key={comment.video_id}
      comment={comment}
      />
    )
};

useEffect(() => {
    let mounted = true;
    if(mounted){
        fetchComments();
    }
    return () => mounted = false;
});

const setComment = async () => {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/${video.video_id}&key=${KEY}`
        );
        setComments(response.data);
    } catch (error) {
        console.log(error.message);
    }
    return (
        <div>
            <table>
                <thead>Comments</thead>
                <tbody>
                    {props.comments.map((comment) => {
                        return (
                            <tr>
                                <td>{comment.text}</td>
                                <div className='like-dislike'>
                                    <td>{comment.likes}</td>
                                    <td>{comment.dislikes}</td>
                                </div>
                            </tr>
                        )
                    })}
                </tbody>
                <form>
                    <h2>
                        Add Comment
                    </h2>
                    <input>
                    </input>
                </form>
            </table>
        </div>
    );
};

export default Comment;