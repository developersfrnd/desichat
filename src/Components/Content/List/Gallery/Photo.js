import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { Link } from 'react-router-dom';

function Photo(props) {

    const [toggler, settoggler] = useState(false);
    const [fslightSource, setfslightSource] = useState('')

    const clickEventHandler = () => {
        setfslightSource(`${props.photo.name}`);
        settoggler(!toggler)
    }
    const removePhoto = () => {
        props.deletePhoto(props.photo.id)
    }

    return (
        <div className="isotope-item col-lg-3 col-md-4 col-sm-6 photography muted_background fashion">
            <div className="vertical-item gallery-title-item content-absolute">
                <div className="item-media">
                    
                    <FsLightbox 
                        toggler={toggler} 
                        type="image" 
                        sources={[fslightSource]} 
                    />

                    <img src={props.photo.name} alt="" />
                    <div className="media-links">
                        <div className="links-wrap">
                            <a className="p-view prettyPhoto" href title={props.photo.title}  onClick={clickEventHandler}></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="item-title text-center">
                <h4>{props.photo.title}</h4>
                <span className="categories-links">
                <Link className="theme_button small_button color2" onClick={removePhoto}>Delete Photo</Link>
                    <a rel="category" href="javascript:;" onClick={clickEventHandler} className="theme_button small_button color1">
                        {props.photo.tag}
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Photo