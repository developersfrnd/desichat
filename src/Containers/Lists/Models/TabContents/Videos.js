import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TinyLoading from '../../../../Components/Loaders/TinyLoading';
import VideoModel from '../../../../ApiManager/videoModel';
import { toast } from 'react-toastify';
import Messages from '../../../../Config/Messages';
import Video from '../../../../Components/Videos/Video';

function Videos() {

    const [videos, setVideos] = useState([]);
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [isAnyNewVideoPurchased, setisAnyNewVideoPurchased] = useState(false)
    const { userId } = useParams()
    
    useEffect(() => {
        VideoModel.getVideos({params:{page:page,model_id:userId}})
            .then((res) => {
                setVideos(res.data) 
                setloading(false)
            })
            .catch(error => {
                toast(error.message)
                setloading(false)
            })    
    }, [page,isAnyNewVideoPurchased])

    const newVideoPurchaseHandler = () => {
        setloading(true)
        setisAnyNewVideoPurchased(!isAnyNewVideoPurchased);
    }

    const clickPageNumberHandler = (pageNumber) => {
        setpage(pageNumber);
    }

    return (
        (loading) ? <TinyLoading /> : 
        <div className="col-sm-12">
            <div>
                <div className="isotope_container isotope row masonry-layout" data-filters=".isotope_filters">
                {
                        (!videos.data.length) ? Messages.noRecordFound : 
                        videos.data.map((video,Index) => {
                            return <Video
                                key={video.id}  
                                video={video}
                                videoIndex={Index}
                                newVideoPurchaseHandler={newVideoPurchaseHandler} 
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Videos