import React, { useState } from 'react';
import Constants from '../../../Config/Constants'
import { useForm } from 'react-hook-form';
import Loading from '../../Loaders/Loading';
import PhotoModel from '../../../ApiManager/photoModel'
import { toast } from 'react-toastify';
import ValidationError from '../ValidationError';
import Messages from '../../../Config/Messages';
import Sidebar from '../../Profile/Sidebar';
import SubmitBtn from '../SubmitBtn';


function AddPhotos() {

    const { register, handleSubmit, errors, reset} = useForm()
    const [selectedPhotos, setselectedPhotos] = useState([]);
    const [fileTypeError, setfileTypeError] = useState('')
    const [inprogress, setinprogress] = useState(false)

    const isFileObject = (file) => {
        if(file && typeof file === 'object'){
            return true;
        }else{
            return false;
        }    
    }

    const onChangeImageFileInputHandler = (event) => {
        let valid = true;
        let photosInput = event.target.files; 
        
        for (const photoKey in photosInput) {
            
            let file = photosInput[photoKey];
            if(isFileObject(file) && file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png'){
                valid = false;
                break;
            }
        }

        if(!valid){
            setfileTypeError(Messages.imageFileTypeError);
        }else{
            setselectedPhotos(event.target.files);
            setfileTypeError('');   
        }
    }    
    
    const postPhotos = (formData) => {
		PhotoModel.postPhotos(formData)
            .then((res) => {
                    setinprogress(false);
                    toast.success(Messages.successMessage)        
                    reset()
                })
                .catch(error => {
                    setinprogress(false);
                    toast.error(error.message);
                })
    }

    const onSubmit = (data) => {
        setinprogress(true);
        let formData = new FormData(document.getElementById('addPhotos'));
            formData.append('photos', selectedPhotos)
            postPhotos(formData);
    }

    return (
        <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                        <h3>Add Photos</h3>
                        <form className="contact-form" id="addPhotos" onSubmit={handleSubmit(onSubmit)}>
                            <p className="contact-form-name">
                                <label htmlFor="title">Title
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="title" className="form-control" placeholder="Title" ref={register({required:{value:true,message:Messages.isRequired}})} />
                                {errors.title && <ValidationError message={errors.title.message} />}
                            </p>
                            <p className="contact-form-name">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" className="form-control" placeholder="Description" ref={register} />
                            </p>
                            <p className="contact-form-name">
                                <label htmlFor="Tag">Tags
                                    <span className="required">*</span>
                                </label>
                                <select name="tag" className="form-control" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                    {(Constants.tags).map((option) => {
                                        return <option value={option.value} key={option.value}>{option.displayValue}</option>
                                    })}
                                </select>
                                {errors.tag && <ValidationError message={errors.tag.message} />}
                            </p>
                            <p className="contact-form-name">
                                <label htmlFor="Photos">Photos 
                                    <span className="required">*</span> &nbsp;&nbsp;(JPEG,PNG)
                                </label>
                                <input type="file" 
                                    multiple={true} 
                                    name="photos[]" 
                                    className="form-control"
                                    onChange={onChangeImageFileInputHandler} 
                                    ref={register({required:{value:true,message:Messages.isRequired}})} 
                                />
                                {errors.photos && <ValidationError message={errors.photos.message} />}
                                {(fileTypeError) ? <ValidationError message={fileTypeError} /> : ''}
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

export default AddPhotos


