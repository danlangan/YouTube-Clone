import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useParams, useLocation } from "react-router-dom";

const Comment = (props) => {
    const [user, token] = useAuth();
    const [comments, setComments] = useState([]);
    const { videoId } = useParams();
    const { state  } = useLocation();
    const [newText, setNewText] = useState('')

    console.log(state)

    async function fetchComments(){
        try {
        let response = await axios.get(`http://127.0.0.1:8000/api/viewvideo/${props.videoId}/`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
        setComments(response.data);
        console.log(response.data);
        } catch (error) {
            console.log(error.message)
        }
    };

    useEffect(() => {
        let mounted = true;
        if(mounted){
            fetchComments(); 
        }
        return () => mounted = false;
    },[token]);

    async function postComment(newComment){
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/viewvideo/${videoId}`, newComment, { // might wnant to take away the props.videoId here... just added it in to see if it would return an array of data inside of the console.log()
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
            console.log(response.data);
            if (response.status === 201){
                setComments(response.data);
            }
            fetchComments(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };


    async function handleAddComment(event){
        event.preventDefault();
        let newComment = {
            text : newText,
            video_id : videoId,
            Bearer : token
        }
        console.log(newComment);
        postComment(newComment);
        setNewText('');
    };

    return (
        <div>
                <h2>Comments</h2>
                <ul>
                    {comments.map((comment, index) => {
                        return (                                                 
                                <li key={index}>{comment.text}</li>
                                // <div className='like-dislike'>
                                //     <li>{comment.likes}</li>
                                //     <li>{comment.dislikes}</li>
                                // </div>
                        );
                    })}
                </ul>
                <form onClick={(event) => handleAddComment(event)}>
                    <h2>
                        Add a comment below, {user.username}!
                    </h2>
                    <input type="text" spellCheck="true" className="comment-box" placeholder="Add Comment Here" value={newText} onChange={(event) => setNewText(event.target.value)}></input>
                    <button type='submit'>Submit Comment</button>
                </form>
        </div>
    );
};

export default Comment; 