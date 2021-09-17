import React, { useState, useEffect } from 'react'
import Loading from '../../../Components/Loaders/Loading'
import PaginationLinks from '../../Pagination/PaginationLinks'
import Photo from '../../../Components/Content/List/Gallery/Photo'
import PhotoModel from '../../../ApiManager/photoModel'
import { toast } from 'react-toastify'
import Sidebar from '../../../Components/Profile/Sidebar'
import Messages from '../../../Config/Messages'

function Photos() {

    const [photos, setPotos] = useState([]);
    const [loading, setloading] = useState(true)
	const [page, setpage] = useState(1)
	const [listchange, setListChange] = useState(false)

    useEffect(() => {
        PhotoModel.getPhotos({params:{page:page}})
            .then((res) => {
				setPotos(res.data) 
				setloading(false)
            })
            .catch(error => {
                toast(error.message)
                setloading(false)
            })    
    }, [page, listchange])

    const deletePhoto = (id) => {
        PhotoModel.deletePhoto(id)
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
                        <h3>My Photos</h3>
						<div className="col-sm-12">
							<div className="isotope_container isotope row masonry-layout" data-filters=".isotope_filters">
							{	
                                (!photos.data.length) ? Messages.noRecordFound : 
								photos.data.map((photo,Index) => {
									return <Photo
										key={photo.id}  
										photo={photo}
										imageIndex={Index+1}
                                        deletePhoto={deletePhoto}
									/>
								})
							}

							</div>
                            <PaginationLinks meta={photos.meta} clickEvent={clickPageNumberHandler} />
						</div>
					</div>
                    <Sidebar />
				</div>
            </div>
		</section>
    )
}

export default Photos