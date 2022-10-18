import React, { useState, useEffect } from "react";
import axios from "axios";
import { KEY } from '../../localKey';
import useAuth from "../../hooks/useAuth";

const Comment = (props) => {
    
    const [user, token] = useAuth();
    const [comments, setComments] = useState([])

    async function fetchComments(){
        try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${props.videoId}&key=${KEY}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
        mapComments(response.data.results);
        } catch (error) {
            console.log(error.message)
        }
    };

    useEffect(() => {
        let mounted = true;
        if(mounted){
            setComments();
        }
        return () => mounted = false;
    },[]);

    function mapComments(){

        return comments.map(comment => 
        <comment
        key={comment.video_id}
        comment={comment.text}
        likes={comment.likes}
        dislikes={comment.dislikes}
        />
        )
    };

    async function postComment(newComment){
        try {
            let response = await axios.post(`https://www.googleapis.com/youtube/v3/${props.videoId}&key=${KEY}`, newComment, {
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
            <table>
                <thead>Comments</thead>
                <tbody>
                    {comments && props.comments.map((comment) => {
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
                        Add a comment below, {user.username}!
                    </h2>
                    <input type="text" className="comment-box" placeholder="Add Comment Here" value={props} onChange={(event) => postComment(event.target.value)}/>
                    <button type='submit'>Submit Comment</button>
                </form>
            </table>
        </div>
    );
};

export default Comment; 