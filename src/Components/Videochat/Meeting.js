import React, {useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import broadcastModel from '../../ApiManager/Broadcast'
import usersModel from '../../ApiManager/user'


function Meeting() {

    const [videoSessionId, setvideoSessionId] = useState(null);
    const [videoChattoken, setvideoChattoken] = useState(null)
    const [inprogress, setinprogress] = useState(false)

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://static.opentok.com/v2/js/opentok.min.js";
        script.async = true;
        document.getElementById('chatJs').appendChild(script)
        //document.body.appendChild(script);
      return () => {
          document.body.removeChild(script);
        }
      }, []);

    function handleError(error) {
        if (error) {
            toast.error(error.message)
        }
    }
    
    const sessionCreationEventHandler = () => {
        usersModel.getBroadcastInfoToCreate()
        .then(res => {

            let session = window.OT.initSession('46920604', res.data.data.broadcastSessionId);

            //Subscribe to a newly created stream
            session.on('streamCreated', function(event) {
                session.subscribe(event.stream, 'subscriber', {
                  insertMode: 'append',
                  width: '100%',
                  height: '100%'
                }, handleError);
            });

            //Create a publisher
            const publisher = window.OT.initPublisher('publisher', {
                insertMode: 'append',
                width: '100%',
                height: '100%'
            }, handleError);

            //Connect to the session
            session.connect(res.data.data.token, async function(error){
                if(error){
                    handleError(error)
                }else{
                    
                    setvideoSessionId(res.data.data.broadcastSessionId)
                    setvideoChattoken(res.data.data.token)
                    
                    session.publish(publisher, handleError);
                    //let response = await usersModel.startbroadcast(res.data.data.broadcastSessionId);
                }
            })
        })
        .catch(error => {
            toast.error(error)
        })
    }  

    return (
        (inprogress) ? 'Loading...' :
        <section className="ds section_padding_70">
            <div className="container">
                <div className="row">
                    <div id="chatJs"></div>
                    <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
                        {
                        (!videoSessionId) ? 
                        <button 
                            name="contact_submit" 
                            onClick={sessionCreationEventHandler} 
                            className="theme_button color1">
                                Start Video Chat
                        </button>
                        :
                        <div id="videos">
                            <div id="subscriber"></div>
                            <div id="publisher"></div>
                        </div>
                        }    
                    </div>
                </div> 
            </div> 
        </section>           
    )
}

export default Meeting
