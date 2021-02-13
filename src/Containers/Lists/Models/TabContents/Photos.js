import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TinyLoading from '../../../../Components/Loaders/TinyLoading';
import photoModel from '../../../../ApiManager/photoModel';
import { toast } from 'react-toastify';
import Photo from '../../../../Components/Content/List/Gallery/Photo';
import Messages from '../../../../Config/Messages';

function Photos() {

    const [photos, setPotos] = useState([]);
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const { userId } = useParams()
	
    useEffect(() => {
        photoModel.getUserPhotos(userId,{params:{page:page}})
            .then((res) => {
                console.log(res);
				setPotos(res.data) 
				setloading(false)
            })
            .catch(error => {
                toast(error.message)
                setloading(false)
            })    
    }, [])

	return (
        (loading) ? <TinyLoading /> : 
        <div className="col-sm-12">
            <div>
                <div className="isotope_container isotope row masonry-layout" data-filters=".isotope_filters">
                    {	
                        (!photos.data.length) ? Messages.noRecordFound : 
                        photos.data.map((photo,Index) => {
                            return <Photo
                                key={photo.id}  
                                photo={photo}
                                imageIndex={Index+1} 
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Photos