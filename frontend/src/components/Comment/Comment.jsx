import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

const Comment = (props) => {
    const [user, token] = useAuth();
    const [comments, setComments] = useState([]);
    const { videoId } = useParams();

    const [newText, setNewText] = useState('')


    async function fetchComments(){
        try {
        let response = await axios.get(`http://127.0.0.1:8000/api/viewvideo/${videoId}`, {
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
    },[]);

    async function handleAddComment(event){
        event.preventDefault();
        let newComment = {
            text : newText,
            video_id : videoId,
            Bearer : token
        }
        postComment(newComment);
        console.log(newComment);
        setNewText('');
    };

    async function postComment(newComment){
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/viewvideo/`, newComment, {
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

    return (
        <div>
                <h2>Comments</h2>
                <ul className="map-comments">
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