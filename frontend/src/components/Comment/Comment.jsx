import React, { useState, useEffect } from "react";
import axios from "axios";
import { KEY } from '../../localKey';
import useAuth from "../../hooks/useAuth";
import { useParams, useLocation } from "react-router-dom";

const Comment = (props) => {
    const [user, token] = useAuth();
    const [comments, setComments] = useState([]);
    const { videoId } = useParams();
    const { state  } = useLocation();
    console.log(state)

    async function fetchComments(){
        try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${videoId}&key=${KEY}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
        setComments(response.data.results);
        } catch (error) {
            console.log(error.message)
        }
    };

    useEffect(() => {
        let mounted = true;
        if(mounted){
            fetchComments();
        }
        // return () => mounted = false;
    },[token]);

    async function postComment(newComment){
        try {
            let response = await axios.post(`https://www.googleapis.com/youtube/v3/${props.videoId.comment}&key=${KEY}`, newComment, {
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
                <ul>
                    {comments.map((comment, index) => {
                        return (
                                <li key={index}>{comment.text}</li>
                                // <div className='like-dislike'>
                                //     <li>{comment.likes}</li>
                                //     <li>{comment.dislikes}</li>
                                // </div>
                        );
                    })};
                </ul>
                <form>
                    <h2>
                        Add a comment below, {user.username}!
                    </h2>
                    <input type="text" spellCheck="true" className="comment-box" placeholder="Add Comment Here" value={props} onChange={(event) => postComment(event.target.value)}/>
                    <button type='submit'>Submit Comment</button>
                </form>
        </div>
    );
};

export default Comment; 