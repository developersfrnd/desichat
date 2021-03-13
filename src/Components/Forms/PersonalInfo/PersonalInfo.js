import React, { useState, useEffect } from 'react';
import Constants from '../../../Config/Constants'
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import SubmitBtn from '../SubmitBtn';
import ValidationError from '../ValidationError';
import usersModel from '../../../ApiManager/user';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function PersonalInfo() {

    const { register, errors, handleSubmit } = useForm();
    const [fileTypeError, setfileTypeError] = useState('')
    const [selectedPhotos, setselectedPhotos] = useState([]);
    const [inprogress, setinprogress] = useState(false);
    const [countries, setcountries] = useState([]);
    const [authUser, setauthUser] = useState('')
    const history = useHistory();

    useEffect(() => {
        setcountries(Constants.countries);
        usersModel.getAuthUser()
        .then(user => {
            setauthUser(user.data.data); 
        })
    }, [])


    const isFileObject = (file) => {
        if(file && typeof file === 'object'){
            return true;
        }else{
            return false;
        }    
    }

    const isValidFile = () => (fileTypeError === '') ? true : false;

    const validateImageDimensions = async (imgFile) => {

        return new Promise((resolve) => {
            let _URL = window.URL || window.webkitURL;
            let validDimension = true;
            let width = 0;
            let height = 0;

            let img = new Image();
            img.src = _URL.createObjectURL(imgFile);
            img.onload = () => {
                width = img.width;
                height = img.height;
                
                if((width < 300) || (height < 300)){
                    validDimension = false;
                }

                resolve(validDimension); 
            }
        });
    }

    const onChangeImageFileInputHandler = async (event) => {
        let valid = true;
        let photosInput = event.target.files; 
        
        let file = photosInput[0];
        if(isFileObject(file) && file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png'){
            valid = false;
        }
        
        let isValidDimension = await validateImageDimensions(file);
        
        if(!valid){
            setfileTypeError(Messages.imageFileTypeError);
        }else if(!isValidDimension){
            setfileTypeError(Messages.imageDimensionError);
        }else{
            setselectedPhotos(photosInput);
            setfileTypeError('');   
        }

        
    }

    const submitEventHandler = (data) => {
        
        let qryString = window.location.search;
        setinprogress(true);

        let formData = new FormData(document.getElementById('personalInfo'));
        
        formData.profile_picture = data.profile_picture[0];
        formData.id = authUser.id;
        
        usersModel.updateUser(formData)
        .then(res => {
            let pushUrl = '/questionnire'
            
            if(qryString && qryString == '?edit=1'){
                pushUrl = "/profile"
            }
            
            setinprogress(false);
            history.push(pushUrl)
        })
        .catch(error => toast.error(error));
    }
    
    return (
        <section className="ds section_padding_70">
            <div className="container">
                <div className="row">
                    <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
                        <h2 className="big margin_0">Personal Information</h2>
                        <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Personal Information</h2>
                        
                        <form id="personalInfo" name="personalInfo" className="contact-form" method="post" onSubmit={ handleSubmit(submitEventHandler) }>
                            <input type="hidden" name="_method" value="PUT" ref={register} />
                            <div className="form-group col-md-12">
                                <select className="form-control" name="country" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                    {countries.map(option => (
                                        <option value={option.value} key={option.value} selected={(authUser.country && authUser.country == option.value) ? 'selected' : ''}>
                                            {option.displayValue}
                                        </option>
                                    ))}    
                                </select>
                                {errors.country && <ValidationError message={errors.country.message} />}
                            </div>
                            
                            <div className="form-group col-md-12">
                                <label htmlFor="address" className="sr-only">Address
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="address" className="form-control" placeholder="Address" defaultValue={authUser.address} ref={register({required:{value:true,message:Messages.isRequired}})} />
                                <i className="rt-icon2-pen2"></i>
                                {errors.address && <ValidationError message={errors.address.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="address" className="sr-only">City
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="city" className="form-control" placeholder="City" defaultValue={authUser.city} ref={register({required:{value:true,message:Messages.isRequired}})} />
                                <i className="rt-icon2-pen2"></i>
                                {errors.city && <ValidationError message={errors.city.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="address" className="sr-only">State
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="state" className="form-control" placeholder="State" defaultValue={authUser.state} ref={register({required:{value:true,message:Messages.isRequired}})} />
                                <i className="rt-icon2-pen2"></i>
                                {errors.state && <ValidationError message={errors.state.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="address" className="sr-only">Zip Code
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="zipcode" className="form-control" placeholder="Zip Code" defaultValue={authUser.zipcode} ref={register({required:{value:true,message:Messages.isRequired}})} />
                                <i className="rt-icon2-pen2"></i>
                                {errors.zipcode && <ValidationError message={errors.zipcode.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="phone" className="sr-only">Phone Number
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="phone" className="form-control" placeholder="Phone Number" defaultValue={authUser.phone} ref={register({required:{value:true,message:Messages.isRequired}})} />
                                <i className="rt-icon2-pen2"></i>
                                {errors.phone && <ValidationError message={errors.phone.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="profile_picture" className="sr-only">Profile Picture
                                    <span className="required">*</span>
                                </label>
                                <input type="file" 
                                    name="profile_picture" 
                                    className="form-control"
                                    onChange={onChangeImageFileInputHandler} 
                                    ref={register({required:{value:true,message:Messages.isRequired},validate:isValidFile})} 
                                />
                                {errors.photos && <ValidationError message={errors.photos.message} />}
                                {(fileTypeError) ? <ValidationError message={fileTypeError} /> : ''}
                            </div>
                            
                            <SubmitBtn inprogress={inprogress} value="Submit" />  
                            <button type="reset" id="contact_form_clear" name="contact_clear" className="theme_button inverse bottommargin_0">Clear</button>
                        </form>
                    </div>
                </div>
            </div>
		</section>
    )
}
export default PersonalInfo