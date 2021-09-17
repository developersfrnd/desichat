import React, { useState } from 'react'
import SubmitBtn from '../SubmitBtn'
import Aux from '../../../hoc/Aux'
import {useForm } from 'react-hook-form'
import Messages from '../../../Config/Messages';
import ValidationError from '../ValidationError'
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import usersModel from '../../../ApiManager/user'

function Contact() {

    const { register, handleSubmit, errors } = useForm();

	const [inProgress, setinProgress] = useState(false)
    const history = useHistory()

	const onSubmit = (data) => {
        setinProgress(true);
        usersModel.contactus(data)
            .then((res) => {
				toast.success(res.data.message);
				setinProgress(false);
				document.getElementById("contactForm").reset();
            })
            .catch((error) => {
                if(error.response){
                    toast.error(error.response.data.errors);
                }
                setinProgress(false);
            })
    }

    return (
        <Aux>
            <section className="ds contacts section_padding_50 ms">
				<div className="container">
					<div className="row topmargin_10 bottommargin_20">
						<div className="col-sm-4">
							<div className="teaser text-center">
								<h4 className="bottommargin_20">Reception</h4>
								<span className="highlight">support@dsc.com</span>
							</div>
						</div>
						<div className="col-sm-4 with_border">
							<div className="teaser text-center">
								<h4 className="bottommargin_20">Booking</h4>
								<span className="highlight">info@dsc.com</span>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="teaser text-center">
								<h4 className="bottommargin_20">President</h4>
								<span className="highlight">admin@dsc.com</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="ds section_padding_70">
				<div className="container">
					<div className="row">
						<div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
							<h2 className="big margin_0">Contact Us</h2>
							<h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Contact Form</h2>

							<form className="contact-form" id="contactForm" onSubmit={handleSubmit(onSubmit)}>
								<div className="form-group">
									<label htmlFor="name" className="sr-only">Full Name
										<span className="required">*</span>
									</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        className="form-control text-center" 
                                        placeholder="Full name" 
                                        ref={register({required:{value:true, message:Messages.isRequired}})}
                                    />
                                    {errors.name && <ValidationError message={errors.name.message} />}
								</div>

								<div className="form-group">
									<label htmlFor="phone" className="sr-only">Phone number
										<span className="required">*</span>
									</label>
                                    <input 
                                        type="text" 
                                        size="30" 
                                        name="phone" 
                                        className="form-control text-center" 
                                        placeholder="Phone number" 
                                        ref={register({required:{value:true, message:Messages.isRequired}})}
                                    />
                                    {errors.phone &&  <ValidationError message={errors.phone.message} />}
								</div>
								<div className="form-group bottommargin_30">
									<label htmlFor="message" className="sr-only">Message</label>
                                    <textarea 
                                        rows="6" cols="45" 
                                        name="description"
                                        className="form-control text-center" 
                                        placeholder="Message" 
                                        ref={register({required:{value:true, message:Messages.isRequired}})}
                                    />
                                    {errors.message &&  <ValidationError message={errors.description.message} />}
								</div>

								<SubmitBtn inprogress={inProgress} value="Send" />
								<button type="reset" id="contact_form_clear" name="contact_clear" className="theme_button inverse bottommargin_0">Clear</button>
							</form>
						</div>
					</div>
				</div>
			</section>
        </Aux>
    )
}

export default Contact
