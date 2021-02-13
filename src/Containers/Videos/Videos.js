import React, { useState, useEffect } from 'react'
import PaginationLinks from '../../Containers/Pagination/PaginationLinks'
import Video from '../../Components/Videos/Video';
import Loading from '../../Components/Loaders/Loading';
import VideoModel from '../../ApiManager/videoModel'
import { toast } from 'react-toastify';
import Messages from '../../Config/Messages';

function Videos() {

    const [videos, setVideos] = useState([]);
    const [loading, setloading] = useState(true)
    const [isAnyNewVideoPurchased, setisAnyNewVideoPurchased] = useState(false)
    const [page, setpage] = useState(1)
    
    useEffect(() => {
        VideoModel.getVideos({params:{page:page}})
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
        (loading) ? <Loading /> :
        <section className="ds page_portfolio section_padding_top_80 section_padding_bottom_50 columns_padding_0 gorizontal_padding">
				<div className="container-fluid">
				<div className="col-lg-9"> &nbsp;</div>
					<div className="row">
						<div className="col-sm-12">
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
                            <PaginationLinks meta={videos.meta} clickEvent={clickPageNumberHandler} />
						</div>
					</div><br /><br /><br /><br /><br /><br /><br /><br />
				</div>
			</section>
    )
}

export default Videos
