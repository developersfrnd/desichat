import React, { useState, useEffect, useContext } from 'react'
import SubmitBtn from '../SubmitBtn'
import { useForm } from 'react-hook-form'
import ValidationError from '../ValidationError'
import Messages from '../../../Config/Messages'
import { AppContext } from '../../../Context'
import usersModel from '../../../ApiManager/user'
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import authModel from '../../../ApiManager/auth'
import Verify from '../Registration/Verify'
import { Link } from 'react-router-dom'

function Login() {

    const emailRejx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { register, errors, handleSubmit } = useForm()

    const [inProgress, setinProgress] = useState(false)
    const history = useHistory()
    const authUserContext = useContext(AppContext)

    useEffect(() => {
        let authToken = usersModel.authToken();
        if(authToken){
            if(!authUserContext.authUser){
                usersModel.getAuthUser()
                .then(user => {
                    authUserContext.handleEvent({authUser:user.data.data})
                    history.push('/profile');
                })
            }else{
                history.push('/profile');
            }
        }
    }, [])
    
    const submitEventHandler = (data) => {
        setinProgress(true);
        usersModel.loginUser(data)
            .then((res) => {
                if (res.data.data.emailVerified){
                    authModel.setAuthToken(res.data.data)
                    authUserContext.handleEvent({authUser:res.data.data})
                    history.push("/profile")
                }else{
                    history.push('/verify-email');
                }
            })
            .catch((error) => {
                if(error.response){
                    toast.error(error.response.data.errors);
                }
                setinProgress(false);
            })
    }

    return (
        <section className="ds section_padding_70">
                <div className="container">
					<div className="row">
						<div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
                            <form className="contact-form" method="post" onSubmit={ handleSubmit(submitEventHandler) }>
                                <h2 className="big margin_0">Login</h2>
							    <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Login Form</h2>
                                <div className="form-group col-md-12">
                                    <label htmlFor="username" className="sr-only">Username
                                        <span className="required">*</span>
                                    </label>
                                    <input 
                                        type="username" 
                                        name="username" 
                                        className="form-control" 
                                        placeholder="Username*" 
                                        ref={register({
                                            required:{value:true,message:Messages.isRequired}
                                        })}
                                    />
                                    {errors.username && <ValidationError message={errors.username.message} />}
                                </div>
                                

                                <div className="form-group col-md-12">
                                    <label htmlFor="password" className="sr-only">Password
                                        <span className="required">*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        placeholder="Password*" 
                                        ref={register({required:{value:true,message:Messages.isRequired}})}
                                    />
                                    {errors.password && <ValidationError message={errors.password.message} />}
                                </div>    

                                <SubmitBtn inprogress={inProgress} value="Login" />
                                <Link to="/forgotpassword" className="theme_button bottommargin_0"> Forgot Password </Link>
							</form>
                        </div>
					</div>
				</div>
			</section>
    )
}

export default Login
