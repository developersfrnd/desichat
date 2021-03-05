import React, { useState, useEffect, useContext } from 'react'
import SubmitBtn from '../SubmitBtn'
import { useForm } from 'react-hook-form'
import ValidationError from '../ValidationError'
import Messages from '../../../Config/Messages'
import { AppContext } from '../../../Context'
import usersModel from '../../../ApiManager/user'
import { toast } from 'react-toastify'
import { Redirect, useHistory } from "react-router-dom";
import authModel from '../../../ApiManager/auth'

function Login() {

    const emailRejx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { register, errors, handleSubmit } = useForm()

    const [inProgress, setinProgress] = useState(false)
    const history = useHistory()
    const authUserContext = useContext(AppContext)

    useEffect(() => {
        let authToken = usersModel.authToken();
        if(authToken){
            history.push('/profile');
        }
    }, [])
    
    const submitEventHandler = (data) => {
        setinProgress(true);
        usersModel.loginUser(data)
            .then((res) => {
                authModel.setAuthToken(res.data.data)
                authUserContext.handleEvent({authUser:res.data.data})
                history.push("/profile")
            })
            .catch((error) => {
                toast.error(error.message)
                setinProgress(false);
            })
    }

    return (
        (authModel.getAuthToken()) ? <Redirect to="" /> : 
        <section className="ds section_padding_70">
                <div className="container">
					<div className="row">
						<div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
							<h2 className="big margin_0">Login</h2>
							<h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Login Form</h2>

							<form className="contact-form" method="post" onSubmit={ handleSubmit(submitEventHandler) }>

                                <div className="form-group col-md-12">
                                    <label htmlFor="email" className="sr-only">Email
                                        <span className="required">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="email" 
                                        ref={register({
                                            required:{value:true,message:Messages.isRequired},
                                            pattern: {value: emailRejx, message:Messages.isEmail}
                                        })}
                                    />
                                    {errors.email && <ValidationError message={errors.email.message} />}
                                </div>
                                

                                <div className="form-group col-md-12">
                                    <label htmlFor="password" className="sr-only">Password
                                        <span className="required">*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        placeholder="Password" 
                                        ref={register({required:{value:true,message:Messages.isRequired}})}
                                    />
                                    {errors.password && <ValidationError message={errors.password.message} />}
                                </div>    

                                <SubmitBtn inprogress={inProgress} value="Login" />
							</form><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
						</div>
					</div>
				</div>
			</section>
    )
}

export default Login
