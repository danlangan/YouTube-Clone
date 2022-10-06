import axios from 'axios';
import ViewVideo from '../ViewVideo/ViewVideo';


const ViewRelatedVideos = async () => {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${user.search}&key=${KEY}`);
        setVideo(response.data);
    } catch (error) {
        console.log(error.message);
    }};

    return (
        <div className='relatedVideos'>

        </div>
    )

export default ViewRelatedVideos;
