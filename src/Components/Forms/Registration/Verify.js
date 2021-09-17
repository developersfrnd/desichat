import React, { useContext, useState } from 'react';
import usersModel from '../../../ApiManager/user';
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import SubmitBtn from '../SubmitBtn';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Verify = ({email, onSucess}) => {
    const { register, handleSubmit, errors} = useForm();
    const [inprogress, setinprogress] = useState(false)
    console.log(email)
    const onSubmitVerify = (data) => {
        setinprogress(true);
        usersModel.verifyUser({ 'remember_token': data.remember_token, 'email':email })
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

    const resendCode = () => {
        event.preventDefault()
        setinprogress(true);
        usersModel.resend({'email':email })
            .then((res)=>{
                setinprogress(false);
                toast.success('Verification code send to your email id')
            })
            .catch((error) => {
                if(error.response){
                    toast.error(error.response.data.errors)
                }
                setinprogress(false);
            })
    }

    return ( 
        <form className="contact-form" method="post" onSubmit={handleSubmit(onSubmitVerify)}>                            
            <h2 className="big margin_0">Verification</h2>
            <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Verify Email</h2>
            <div className="form-group col-md-12">
                <label htmlFor="name" className="sr-only">Verification code
                    <span className="required">*</span>
                </label>
                <input type="text"
                    name="remember_token"
                    className="form-control"
                    placeholder="Verification code"
                    ref={register({ required: { value: true, message: Messages.isRequired } })}
                />
                <i className="rt-icon2-pen2"></i>
                {errors.username && <ValidationError message={errors.remember_token.message} />}
            </div>
            <SubmitBtn inprogress={inprogress} value="Submit" />
            &nbsp;&nbsp;&nbsp;<button onClick={resendCode} className="theme_button bottommargin_0"> Resend </button>
            &nbsp;&nbsp;&nbsp;<Link to="/login" className="theme_button bottommargin_0"> Login </Link>
        </form>
    );
}
 
export default Verify;