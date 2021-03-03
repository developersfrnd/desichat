import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TinyLoading from '../../../../Components/Loaders/TinyLoading';
import VideoModel from '../../../../ApiManager/videoModel';
import { toast } from 'react-toastify';
import Messages from '../../../../Config/Messages';
import Video from '../../../../Components/Videos/Video';
import SubmitBtn from '../../../../Components/Forms/SubmitBtn.js';

function Comments() {

    const [videos, setVideos] = useState([]);
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [isAnyNewVideoPurchased, setisAnyNewVideoPurchased] = useState(false)
    const { userId } = useParams()

    useEffect(() => {
        VideoModel.getVideos({ params: { page: page, model_id: userId } })
            .then((res) => {
                setVideos(res.data)
                setloading(false)
            })
            .catch(error => {
                toast(error.message)
                setloading(false)
            })
    }, [page, isAnyNewVideoPurchased])

    const newVideoPurchaseHandler = () => {
        setloading(true)
        setisAnyNewVideoPurchased(!isAnyNewVideoPurchased);
    }

    const clickPageNumberHandler = (pageNumber) => {
        setpage(pageNumber);
    }

    return (
        (loading) ? <TinyLoading /> :
            <div className="col-sm-12">
                <div>
                    <div class="tabs_content_container commentsContainer">
                        <div>
                            <h2 className="headingtag ">Customer comments (1)</h2>

                            <div class="commentRow">
                                <div class="messageRow">
                                    <p class="headingRow">
                                        <span class="name">
                                            Aditya_24
          </span>
          24 September in 21:35
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



                        <div id="wppp-comments-add" class="comments-add">
                            <h2 className="headingtag ">Write comment</h2>
                            <div className="form-group">
                                <select name="rating"
                                    className="form-control commentPadding">

                                    <option value="1">1 - Poor</option><option value="2">2 - Fair</option><option value="3">3 - Good</option><option value="4">4 - Very Good</option><option value="5" selected="selected">5 - Excellent</option>

                                </select>

                            </div>
                            <div className="form-group">

                                <textarea
                                    className="form-control commentPadding"
                                    placeholder="Comment"
                                    rows="5"
                                ></textarea>

                            </div>
                            <SubmitBtn value="Submit" />
                            <p>You can login <a href="/exec/login" onclick="redirect('/exec/login', {'login_redirect_url': 'https://livedosti.com/chat/Riya_Bhabi'}, 'post'); return false;">here</a>.</p>
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default Comments