import React from 'react'
import Aux from '../../../hoc/Aux'
import {useForm } from 'react-hook-form'
import Messages from '../../../Config/Messages';
import ValidationError from '../ValidationError'

function Contact() {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        alert(data);
        console.log(data);
    }

    return (
        <Aux>
            <section className="ds contacts section_padding_50 ms">
				<div className="container">
					<div className="row topmargin_10 bottommargin_20">
						<div className="col-sm-4">
							<div className="teaser text-center">
								<h4 className="bottommargin_20">Reception</h4>
								Helena
								<br />
								<span className="highlight">helena@reception.com</span>
								<br /> 8 (800) 456-2698
							</div>
						</div>
						<div className="col-sm-4 with_border">
							<div className="teaser text-center">
								<h4 className="bottommargin_20">Booking</h4>
								James
								<br />
								<span className="highlight">james@booking.com</span>
								<br /> 8 (800) 456-2643
							</div>
						</div>
						<div className="col-sm-4">
							<div className="teaser text-center">
								<h4 className="bottommargin_20">President</h4>
								Robert
								<br />
								<span className="highlight">robert@president.com</span>
								<br /> 8 (800) 456-5848
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

							<form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
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

								<button type="submit" id="contact_form_submit" name="contact_submit" className="theme_button color1">Send</button>
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
