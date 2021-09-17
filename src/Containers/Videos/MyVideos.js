import React, { useState, useEffect } from 'react'
import PaginationLinks from '../../Containers/Pagination/PaginationLinks'
import Video from '../../Components/Videos/Video';
import Loading from '../../Components/Loaders/Loading';
import VideoModel from '../../ApiManager/videoModel'
import { toast } from 'react-toastify';
import Messages from '../../Config/Messages';
import Sidebar from '../../Components/Profile/Sidebar';


function MyVideos() {

    const [videos, setVideos] = useState([]);
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [listchange, setListChange] = useState(false)
    
    useEffect(() => {
        VideoModel.getMyVideos({params:{page:page}})
            .then((res) => {
                setVideos(res.data) 
                setloading(false)
            })
            .catch(error => {
                toast(error.message)
                setloading(false)
            })    
    }, [page, listchange])


    const deleteVideo = (id) => {
        VideoModel.deleteVideo(id)
            .then((res)=>{
                setloading(false)
                setListChange(!listchange)
            })
            .catch(error => {
                toast(error.message)
                setloading(false)
            })
    }
    
    const clickPageNumberHandler = (pageNumber) => {
        setpage(pageNumber);
    }

    return (
        (loading) ? <Loading /> :
        <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                        <h3>My Videos</h3>
						<div className="col-sm-12">
                            <div className="isotope_container isotope row masonry-layout" data-filters=".isotope_filters">
							{
                                (!videos.data.length) ? Messages.noRecordFound : 
								videos.data.map((video,Index) => {
									return <Video
										key={video.id}  
										video={video}
                                        videoIndex={Index}
                                        removeVideo={deleteVideo}
                                    />
								})
							}

							</div>
                            <PaginationLinks meta={videos.meta} clickEvent={clickPageNumberHandler} />
						</div>
					</div>
                    <Sidebar />
				</div>
            </div>
		</section>
    )
}

export default MyVideos
