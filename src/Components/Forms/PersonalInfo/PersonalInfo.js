import { ValidationError } from 'ajv';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import SubmitBtn from '../SubmitBtn';



function PersonalInfo() {

    const { register, errors, handleSubmit } = useForm();

    return (
        <section className="ds section_padding_70">
            <div className="container">
                <div className="row">
                    <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
                        <h2 className="big margin_0">Personal Information</h2>
                        <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Personal Information</h2>
                        
                        <form id="personalInfo" name="personalInfo" className="contact-form" method="post" onSubmit={ handleSubmit(submitEventHandler) }>
                            <input type="hidden" name="_method" value="PUT" />
                            <div className="form-group select-group col-md-12">
                                <select className="form-control" name="country" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                    <option value="" key=""></option>
                                </select>
                                {errors.country && <ValidationError message={errors.country.message} />}
                            </div>
                            
                            <div className="form-group col-md-12">
                                <label htmlFor="address" className="sr-only">Address
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="address" className="form-control" placeholder="Address" ref={register({required:{value:true,message:Messages.isRequired}})} />
                                {errors.address && <ValidationError message={errors.address.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="address" className="sr-only">City
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="city" className="form-control" placeholder="City" ref={register({required:{value:true,message:Messages.isRequired}})} />
                                {errors.city && <ValidationError message={errors.city.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="address" className="sr-only">State
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="state" className="form-control" placeholder="State" ref={register({required:{value:true,message:Messages.isRequired}})} />
                                {errors.state && <ValidationError message={errors.state.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="address" className="sr-only">Zip Code
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="zipcode" className="form-control" placeholder="Zip Code" ref={register({required:{value:true,message:Messages.isRequired}})} />
                                {errors.zipcode && <ValidationError message={errors.zipcode.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="phone" className="sr-only">Phone Number
                                    <span className="required">*</span>
                                </label>
                                <input type="text" name="phone" className="form-control" placeholder="Phone Number" ref={register({required:{value:true,message:Messages.isRequired}})} />
                                {errors.phone && <ValidationError message={errors.phone.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="profile_picture" className="sr-only">Profile Picture
                                    <span className="required">*</span>
                                </label>
                                <input type="file" 
                                    multiple={true} 
                                    name="profile_picture" 
                                    className="form-control"
                                    onChange={onChangeImageFileInputHandler} 
                                    ref={register({required:{value:true,message:Messages.isRequired}})} 
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