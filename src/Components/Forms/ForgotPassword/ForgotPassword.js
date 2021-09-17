import React, { useState, useEffect, useContext } from 'react'
import SubmitBtn from '../SubmitBtn'
import ValidationError from '../ValidationError'
import Messages from '../../../Config/Messages'
import usersModel from '../../../ApiManager/user'
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import SetPassword from './SetPassword'
import { useForm } from 'react-hook-form'

function ForgotPassword() {
    const { register, errors, handleSubmit } = useForm()
    const [email, setEmail] = useState('')
    const [tokensend, setTokenSend] = useState(false)
    const history = useHistory();   
    const [inProgress, setinProgress] = useState(false)
    const submitEventHandler = (data) => {
        setinProgress(true);
        usersModel.forgotpasswordtoken(data)
            .then((res) => {
                setEmail(res.data.data.email)
                setTokenSend(true)
            })
            .catch((error) => {
                if(error.response){
                    toast.error(error.response.data.errors);
                }
                setTokenSend(false)
                setinProgress(false);
            })
    }

    const onSucess = (res) => {
        setTokenSend(false)
        setEmail('')
        history.push('/login')
    }

    return (
        <section className="ds section_padding_70">
                <div className="container">
					<div className="row">
						<div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
                        {
                            
                            !tokensend ?
                        (                           

							<form className="contact-form" method="post" onSubmit={ handleSubmit(submitEventHandler) }>
                                <h2 className="big margin_0">Forgot Password</h2>
							    <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Get code to set password</h2>
                                <div className="form-group col-md-12">
                                    <label htmlFor="email" className="sr-only">Email
                                        <span className="required">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="Email*" 
                                        ref={register({
                                            required:{value:true,message:Messages.isRequired}
                                        })}
                                    />
                                    {errors.email && <ValidationError message={errors.email.message} />}
                                </div>                                
  

                                <SubmitBtn inprogress={inProgress} value="Send" />                                
							</form>)
						        : <SetPassword email={email} onSucess={onSucess} />
                            }
                        </div>
					</div>
				</div>
			</section>
    )
}

export default ForgotPassword
