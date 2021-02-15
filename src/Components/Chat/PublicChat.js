import { remove } from 'lodash';
import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import authModel from '../../ApiManager/auth';
import usersModel from '../../ApiManager/user';
const EndPoint = 'http://localhost:8003'
let socket

const PublicChat = ({modelname, modelroom}) => {
    const [state, setState] = useState({message:''});
    const [chat, setChat] = useState([]);
    const [room, setRoom] = useState(modelroom)
    const [name, setName] = useState(modelname)    
    useEffect(() => { 
        socket = io.connect(EndPoint)
        socket.emit('modeljoin',{name, room}) // Join user 
        socket.on('message', ({name, message}) => {
            setChat([...chat, {name, message}])            
        })
    },[modelname, modelroom])

    useEffect(() => {  
        socket.on('receivemessage', ({name, message}) => {
            setChat([...chat, {name, message}])
            var elem = document.getElementById('chatmessage');
            elem.scrollTop = elem.scrollHeight;
        })
        socket.on('disconnected-user', ({id}) => {
            //RemoveRoomFromServer()
        })
    }, [chat, name])

    const TextChange = e => {
        setState({... state, [e.target.name]: e.target.value})
    }
    const onMessageSubmit = (e) => {
        e.preventDefault()
        const {message} = state
        if (message) {
            socket.emit('sendmessage', {name, message})
            setState({message:''});
        }
    }
    
    const renderChat = () => {
        return (
            chat.map(({name, message}, index)=>(
                <li class="media" key={index}><div class="media-body"><span class="bold fontsize_12 text-uppercase grey  with_padding">{name}:</span><span>{message}</span></div></li>
            ))
        )
    }

    function RemoveRoomFromServer() {
        const login_user = authModel.getAuthUserObj()
        if(login_user){
            usersModel.removechatroom()
        }
    }

    return (
        <div className="col-sm-12 bottommargin_40">
                <div className="row">
                    <div className="col-md-12">
                        <div className="item-media">
                            <div className="item-content chat-body" id="chatmessage">
                                <ul className="media-list">
                                    {renderChat()}
                                </ul>        

                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <form className="contact-form" method="post" onSubmit={onMessageSubmit}>
                            <input type="hidden" name="_method" value="PUT" />
                                <div className="form-group">
                                    <label htmlFor="message" className="sr-only"> Message
                                        <span className="required">*</span>
                                    </label>    
                                    <input 
                                        type="text" 
                                        name="message"
                                        onChange={e=>TextChange(e)}
                                        value={state.message}
                                        className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <button class="theme_button color1">Send</button>
                                </div>
                        </form>
                    </div>
                </div>
        </div>
    )

}

export default PublicChat