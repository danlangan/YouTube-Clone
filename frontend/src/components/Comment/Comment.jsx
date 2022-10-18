import React, { useState, useEffect } from "react";
import axios from "axios";
import { KEY } from '../../localKey';

function Comment() {

    const [comments, setComments] = useState([])

    useEffect(() => {
        let mounted = true;
        if(mounted){
            setComments();
        }
        return () => mounted = false;
    });

    const fetchComments = async () => {
        try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${video_id}&key=${KEY}`);
        mapComments(response.data.results);
        } catch (error) {
            console.log(error.message)
        }
    };

    function mapComments(){
        return comments.map(comment => 
        <Comment
        key={comment.video_id}
        comment={comment}
        likes={likes}
        dislikes={dislikes}
        />
        )
    };

    const postComment = async (newComment) => {
        try {
            let response = await axios.post(`https://www.googleapis.com/youtube/v3/${video.video_id}&key=${KEY}`, newComment);
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
                    {comment && props.comments.map((comment) => {
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
                    <input type="text" className="comment-box" placeholder="Add Comment Here" value={comment} onChange={(event) => postComment(event.target.value)}/>
                    <button type='submit'>Submit Comment</button>
                </form>
            </table>
        </div>
    );
};

export default Comment; 