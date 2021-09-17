import React, { useState, useContext } from 'react'
import Constants from '../../../Config/Constants'
import DCDateTimePicker from '../../Shared/DateTimePicker'
import { toast } from 'react-toastify';
import SubmitBtn from '../SubmitBtn';
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import ValidationError from '../ValidationError';
import usersModel from '../../../ApiManager/user';
import { Link, useHistory, useParams } from 'react-router-dom';
import authModel from '../../../ApiManager/auth';
import { AppContext } from '../../../Context';
import Verify from './Verify';

function Registration() {

    const { register, handleSubmit, errors, watch } = useForm();
    const [dob, setdob] = useState(Constants.adultAgeDate());
    const [inprogress, setinprogress] = useState(false)
    const [verify, setVerify] = useState(false)
    const [email, setEmail] = useState('')
    const passwordVal = watch('password')
    const { userType } = useParams()
    const registrationType = (userType == 'model') ? 'Model' : 'Customer'
    const emailRejx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const history = useHistory();
    const AppContextValue = useContext(AppContext)

    const onSucess = (res) => {
        authModel.setAuthToken(res.data.data)
        AppContextValue.handleEvent({ authUser: res.data.data })
        let pushUrl = (userType === 'model') ? '/personal' : '/profile';
        history.push(pushUrl)
    }

    const onSubmit = (data) => {
        setinprogress(true);

        usersModel.isEmailAvailable({ 'email': data.email })
            .then((res) => {
                if (res.data.data) {
                    toast.error(res.data.message)
                    setinprogress(false);
                } else {
                    data['dob'] = dob;
                    data['role'] = Constants.roles[userType];                   
                    return usersModel.postUser(data)
                }
            })
            .then(res => {
                if (res !== undefined) {
                    setinprogress(false);
                    setVerify(true)
                    setEmail(res.data.data.email)
                    
                }
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message)
                } 
                setinprogress(false);
            })
    };

    return (
        <section className="ds section_padding_70">
            <div className="container">
                <div className="row">
                    <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
                        
                        {
                            
                            !verify ?
                        (<form className="contact-form" method="post" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="big margin_0">Free Registration</h2>
                            <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Register as a {registrationType}</h2>
                            <div className="form-group col-md-12">
                                <label htmlFor="name" className="sr-only">Username
                                    <span className="required">*</span>
                                </label>
                                <input type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="Username*"
                                    ref={register({ required: { value: true, message: Messages.isRequired } })}
                                />
                                <i className="rt-icon2-pen2"></i>
                                {errors.username && <ValidationError message={errors.username.message} />}
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="name" className="sr-only">Screen Name
                                    <span className="required">*</span>
                                </label>
                                <input type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Screen Name*"
                                    ref={register({ required: { value: true, message: Messages.isRequired } })}
                                />
                                <i className="rt-icon2-pen2"></i>
                                {errors.name && <ValidationError message={errors.name.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="name" className="sr-only">Email
                                    <span className="required">*</span>
                                </label>
                                <input type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email Address*"
                                    ref={register({
                                        required: { value: true, message: Messages.isRequired },
                                        pattern: { value: emailRejx, message: Messages.isEmail },
                                    }
                                    )}
                                />
                                <i className="rt-icon2-envelope"></i>
                                {errors.email && <ValidationError message={errors.email.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="name" className="sr-only">Password
                                    <span className="required">*</span>
                                </label>
                                <input type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password*"
                                    ref={register({ required: { value: true, message: Messages.isRequired }, minLength: { value: Constants.minPasswordLength, message: Messages.minLength } })}
                                />
                                <i className="rt-icon2-lock-closed-outline"></i>
                                {errors.password && <ValidationError message={errors.password.message} />}
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="name" className="sr-only">Confirm Password
                                    <span className="required">*</span>
                                </label>
                                <input type="password"
                                    name="password_confirmation"
                                    className="form-control"
                                    placeholder="Confirm Password*"
                                    ref={register({
                                        validate: value => value == passwordVal,
                                    })}
                                />
                                <i className="rt-icon2-lock-closed-outline"></i>
                                {errors.password_confirmation && <ValidationError message={Messages.passwordConfirm} />}
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="form-group col-sm-6 dateFormat">
                                        <label htmlFor="name" className="sr-only">Date Of Birth
                                    <span className="required">*</span>
                                        </label>
                                        <DCDateTimePicker
                                            required={true}
                                            onChange={setdob}
                                            format="yyyy-MM-dd"
                                            disableClock={true}
                                            maxDate={Constants.adultAgeDate()}
                                            value={dob}

                                        />
                                    </div>

                                    <div className="form-group col-sm-6 radioOuter">
                                        <div className="col-xs-6">
                                            <label className="radioContainer"> Female
                                        <input
                                                    type="radio"
                                                    name="gender"
                                                    value={Constants.gender.female}
                                                    className="form-control"
                                                    defaultChecked={true}
                                                    ref={register}
                                                />
                                            </label>
                                        </div>
                                        <div className="col-xs-6">
                                            <label className="radioContainer"> Male
                                        <input
                                                    type="radio"
                                                    name="gender"
                                                    value={Constants.gender.male}
                                                    className="form-control"
                                                    ref={register}
                                                />
                                            </label>
                                        </div>
                                        {errors.gender && errors.gender.message}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-12 termsRadio">
                                <label className="radioContainer2">
                                    <input type="checkbox"
                                        name="terms"
                                        value="1"
                                        ref={register({ required: { value: true, message: Messages.isRequired } })}
                                    />
                                </label>
                                I have read and agree to all <Link to="/content/terms"> Terms and Conditions </Link>
                                <br />
                                {errors.terms && <ValidationError message={errors.terms.message} />}
                            </div>

                            <SubmitBtn inprogress={inprogress} value="Submit" />
                            <button type="reset" id="contact_form_clear" name="contact_clear" className="theme_button inverse bottommargin_0">Clear</button>
                        </form>)
                        
                            : <Verify email={email} onSucess={onSucess} />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration


