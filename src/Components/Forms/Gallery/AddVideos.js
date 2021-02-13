import React, { useState } from 'react';
import Constants from '../../../Config/Constants'
import { useForm } from 'react-hook-form';
import VideoModel from '../../../ApiManager/videoModel'
import { toast } from 'react-toastify';
import ValidationError from '../ValidationError';
import Messages from '../../../Config/Messages';
import Sidebar from '../../Profile/Sidebar';
import SubmitBtn from '../SubmitBtn';


function AddVideos() {

    const { register, handleSubmit, errors, reset} = useForm()
    const [imageFileError, setImageFileError] = useState('')
    const [videoFileError, setVideoFileError] = useState('')
    const [inprogress, setinprogress] = useState(false)

    const onChangeImageFileInputHandler = (event) => {
        let fileError = '';
        let file = event.target.files[0]; 
        
        if(file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png'){
            fileError = Messages.imageFileTypeError;

        }else if(file.size > Constants.maxFileSizeToUpload){
            fileError = Messages.fileSizeError
        }
        
        if(fileError){
            setImageFileError(fileError);
        }else{
            setImageFileError('');   
        }
    }
    
    const onChangeVideoFileInputHandler = (event) => {
        let fileError = '';
        let file = event.target.files[0];
        
        if(file.type != 'video/mp4'){
            fileError = Messages.videoFileTypeError;
            
        }else if(file.size > Constants.maxFileSizeToUpload){
            fileError = Messages.fileSizeError
        }

        if(fileError){
            setVideoFileError(fileError);
        }else{
            setVideoFileError('');   
        }
    }
    
    const postVideos = (formData) => {
		VideoModel.postVideos(formData)
            .then( response => {
                setinprogress(false);
                toast.success(Messages.successMessage)        
                reset()
            })
            .catch((error) => {
                setinprogress(false);
                toast.error(error.message);
            });
    }

    const onSubmit = (data) => {
        setinprogress(true);
        let formData = new FormData(document.getElementById('addVideosForm'));
        postVideos(formData);
    }

    return (
        <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                        <h3>Add Videos</h3>
                        <form className="contact-form" id="addVideosForm" onSubmit={handleSubmit(onSubmit)}>
                            <p className="contact-form-name">
                                <label htmlFor="title">Title
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="title" className="form-control" placeholder="Title" ref={register({required:{value:true,message:Messages.isRequired}})} />
                                {errors.title && <ValidationError message={errors.title.message} />}
                            </p>
                            
                            <p className="contact-form-name">
                                <label htmlFor="title">Credit Points
                                    <span className="required">*</span> 
                                </label>
                                <input 
                                    type="number" 
                                    name="creditPoints" 
                                    className="form-control" 
                                    placeholder="Credit Points" 
                                    ref={register({
                                        required:{value:true,message:Messages.isRequired},
                                        pattern:{value:/^\d+$/, message:Messages.validValue}
                                    })} />
                                {errors.creditPoints && <ValidationError message={errors.creditPoints.message} />}
                            </p>
                            
                            <p className="contact-form-name">
                                <label htmlFor="title">Video Duration
                                    <span className="required">*</span> (HH:MM)
                                </label>
                                <input 
                                    type="text" 
                                    name="duration" 
                                    className="form-control" 
                                    placeholder="Duration" 
                                    ref={register({
                                        required:{value:true,message:Messages.isRequired},
                                        pattern:{value:/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, message:Messages.isTime}
                                    })} />
                                {errors.duration && <ValidationError message={errors.duration.message} />}
                            </p>

                            <p className="contact-form-name">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" className="form-control" placeholder="Description" ref={register} />
                            </p>
                            
                            <p className="contact-form-name">
                                <label htmlFor="Photos">Video  
                                    <span className="required">*</span> &nbsp;&nbsp;(MP4)
                                </label>
                                <input type="file" 
                                    name="video" 
                                    className="form-control"
                                    onChange={onChangeVideoFileInputHandler} 
                                    ref={register({
                                        required:{value:true,message:Messages.isRequired},
                                        validate: value => !videoFileError
                                    })} 
                                />
                                {errors.video && <ValidationError message={errors.video.message} />}
                                {(videoFileError) ? <ValidationError message={videoFileError} /> : ''}
                            </p>

                            <p className="contact-form-name">
                                <label htmlFor="Video">Display Image  
                                    <span className="required">*</span> &nbsp;&nbsp;(JPEG,PNG)
                                </label>
                                <input type="file" 
                                    name="thumb" 
                                    className="form-control"
                                    onChange={onChangeImageFileInputHandler} 
                                    ref={register({
                                        required:{value:true,message:Messages.isRequired},
                                        validate: value => !imageFileError
                                    })} 
                                />
                                {errors.thumb && <ValidationError message={errors.thumb.message} />}
                                {(imageFileError) ? <ValidationError message={imageFileError} /> : ''}
                            </p>

                            <SubmitBtn inprogress={inprogress} />       
                        </form>    
                    </div>
                    <Sidebar />
                </div>
            </div>
        </section>
    )
}

export default AddVideos


