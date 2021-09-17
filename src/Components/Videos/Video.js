import React, { useState } from 'react'
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom'
import FsLightbox from 'fslightbox-react';
import { toast } from 'react-toastify';
import usersModel from '../../ApiManager/user';
import Messages from '../../Config/Messages';
import Constants from '../../Config/Constants';

export default function Video(props) {

    const [toggler, settoggler] = useState(false);
    const [fslightSource, setfslightSource] = useState('')
    const [loading, setloading] = useState(false)
    const location = useLocation()
    const history = useHistory()
    
    const divClass = (location.pathname == "/videos") ? 'isotope-item col-lg-2 col-md-4 col-sm-6 photography muted_background' : 'isotope-item col-lg-4 col-md-4 col-sm-6 photography muted_background'

    const clickEventHandler = () => {
        if(!usersModel.authToken()){
            toast.error(Messages.loginRequired)
        }
        else{
            if(props.video.name){
                setfslightSource(`${Constants.videosUrl}${props.video.name}`);
                settoggler(!toggler)
            }else{
                toast.info(Messages.purchaseVideoInfo)
            }
        }        
    }

    const deletVideo = () => {
        props.removeVideo(props.video.id)
    }

    const buynowEventHandler = () => {
        if(!usersModel.authToken()){
            history.push("/login")
        }else{

            if(window.confirm(`Yes, I want to purchase this video for ${props.video.creditPoints} Credit Points.`)){
                setloading(true)
                usersModel.purchaseVideo({'video_id':props.video.id})
                    .then((res) => {
                        if(res.data.status){
                            props.newVideoPurchaseHandler()
                            setloading(false)
                            toast.success(Messages.videoPurchasedSuccessfully)
                        }else{
                            toast.error(res.data.errors);
                        }

                        setloading(false)
                    })
                    .catch(error => toast.error(error.message))
            }else{
                return false
            }
        }
    }

    return (
        (loading) ? 'Loading...' : 
        <div className={divClass}>
            <div className="vertical-item gallery-title-item content-absolute">
                <div className="item-media">
                    <FsLightbox 
                        toggler={toggler} 
                        type="video" 
                        sources={[fslightSource]} 
                    />
                    <img 
                        src={props.video.thumb} 
                        alt={props.video.title} 
                        onClick={() =>  clickEventHandler(props.video.id) }
                        style={{cursor:"pointer"}}
                    /> 
                </div>
            </div>
            <div className="item-title text-center">
                <h4><a href="gallery-single.html">{props.video.title}</a></h4>
                <span className="categories-links">
                    <Link className="theme_button small_button color1">Credit Points : {props.video.creditPoints}</Link>
                    <Link className="theme_button small_button color2" onClick={deletVideo}>Delete Video</Link>
                    {
                        (props.video.name) ? 
                        <Link className="theme_button small_button color2" onClick={clickEventHandler}>View Video</Link>
                        :
                        <Link className="theme_button small_button color2" onClick={buynowEventHandler}>Buy Now</Link>
                    }
                </span>
            </div>
        </div>
    )
}