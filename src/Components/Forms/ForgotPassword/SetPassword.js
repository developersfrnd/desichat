import React, { useState } from 'react';
import usersModel from '../../../ApiManager/user';
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import SubmitBtn from '../SubmitBtn';
import { toast } from 'react-toastify';
import Constants from '../../../Config/Constants'
import ValidationError from '../ValidationError';

const SetPassword = ({email, onSucess}) => {
    const { register, handleSubmit, errors, watch} = useForm();
    const [inprogress, setinprogress] = useState(false)
    const passwordVal = watch('password')
    console.log(email)
    const onSubmitVerify = (data) => {
        setinprogress(true);
        usersModel.setPassword({'email':email, 'forgot_password_token': data.forgot_password_token, 'password':data.password, 'password_confirmation':data.password_confirmation })
            .then((res) => {
                onSucess(res)
            })
            .catch((error) => {
                if(error.response){
                    toast.error(error.response.data.errors)
                }
                setinprogress(false);
            })
    };

    return ( 
        <form className="contact-form" method="post" onSubmit={handleSubmit(onSubmitVerify)}>                            
            <h2 className="big margin_0">Forgot Password</h2>
            <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Set Password</h2>
            <div className="form-group col-md-12">
                <label htmlFor="name" className="sr-only">Verification code
                    <span className="required">*</span>
                </label>
                <input type="text"
                    name="forgot_password_token"
                    className="form-control"
                    placeholder="code"
                    ref={register({ required: { value: true, message: Messages.isRequired } })}
                />
                <i className="rt-icon2-phone2"></i>
                {errors.forgot_password_token && <ValidationError message={errors.forgot_password_token.message} />}
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
            <SubmitBtn inprogress={inprogress} value="Submit" />            
        </form>
    );
}
 
export default SetPassword;