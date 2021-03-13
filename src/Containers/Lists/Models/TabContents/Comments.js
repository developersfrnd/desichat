import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Messages from '../../../../Config/Messages';
import SubmitBtn from '../../../../Components/Forms/SubmitBtn.js';
import { useForm } from 'react-hook-form';
import commentModel from '../../../../ApiManager/comments';
import ValidationError from '../../../../Components/Forms/ValidationError';
import authModel from '../../../../ApiManager/auth';

function Comments(props) {

    const { register, errors, handleSubmit } = useForm()
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [inProgress, setinProgress] = useState(false)
    const [isCustomerLogin, setisCustomerLogin] = useState(false);
    

    useEffect(() => {
        let authToken = authModel.getAuthToken();
        if (authToken) {
            setisCustomerLogin(authModel.isCustomerLogin());
            setisAuthenticated(true);
        }else{
            setisAuthenticated(false);
        }

    }, [isAuthenticated])

    const submitEventHandler = (data, e) => {
        setinProgress(true);
        data = {...data, 'model_id':props.model_id}
        commentModel.postComment(data)
            .then((res) => {
                toast.success(Messages.successMessage);
                e.target.reset()
            })
            .catch((error) => {
                toast.error(error.message)
            })

            setinProgress(false);
    }

    return (
            <div className="col-sm-12">
                <div>
                    <div class="tabs_content_container commentsContainer">
                        <div>
                            <h2 className="headingtag ">Customer comments (1)</h2>
                            <div class="commentRow">
                                <div class="messageRow">
                                    <p class="headingRow">
                                        <span class="name"> Aditya_24 </span> 24 September in 21:35
                                        <span class="vote">
                                            <span className="grey">Rating:</span>
                                            <span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                            </span>
                                        </span>
                                    </p>
                                    <p class="message">Please come online</p>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                        
                        {
                            (!isAuthenticated || !isCustomerLogin) ? '' : 
                        <div id="wppp-comments-add" class="comments-add">
                            <form className="contact-form" method="post" onSubmit={ handleSubmit(submitEventHandler) }>
                                <h2 className="headingtag ">Write comment</h2>
                                <div className="form-group">
                                    <select name="rating" className="form-control commentPadding" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5" selected="selected">5 - Excellent</option>
                                    </select>
                                    {errors.rating && <ValidationError message={errors.rating.message} />}
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="form-control commentPadding" 
                                        placeholder="Comment" 
                                        rows="5"
                                        name="comments"
                                        ref={register}
                                        >
                                    </textarea>
                                </div>
                                <SubmitBtn value="Submit" />
                            </form>    
                        </div>
                        }
                    </div>
                </div>
            </div>
    )
}

export default Comments