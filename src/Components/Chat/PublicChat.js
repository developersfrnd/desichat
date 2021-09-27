import { remove } from 'lodash';
import React, {useState, useEffect} from 'react';
import authModel from '../../ApiManager/auth';
import usersModel from '../../ApiManager/user';
import parse from 'html-react-parser'

const PublicChat = ({socket, modelname, modelroom}) => {
    const [state, setState] = useState({message:''});
    const [chat, setChat] = useState([]);
    const [room, setRoom] = useState(modelroom)
    const [name, setName] = useState(modelname)

    useEffect(() => {
        socket.emit('join', name, room, 'Desi Chat')            
    }, [])

    useEffect(() => {
        socket.on('welcome', ({ name, message }) => {
            setChat([...chat, { name, message }]);
        })
        socket.on('message', ({ name, message }) => {
            setChat(chat => [...chat, { name, message }]);
        })
        socket.on('receivemessage', (name, message) => {
            if (message){
                setChat(chat => [...chat, { name, message }]);
                var elem = document.getElementById('chatmessage');
                elem.scrollTop = elem.scrollHeight;
            }
        })
    }, [socket])

    const TextChange = e => {
        setState({... state, [e.target.name]: e.target.value})
    }
    const onMessageSubmit = (e) => {
        e.preventDefault()
        const {message} = state
        if (message) {
            socket.emit('sendmessage', room, name, message)
            setState({message:''});
        }
    }
    
    const renderChat = () => {
        return (
            chat.map(({name, message}, index)=>(
                <li class="media" key={index}><div class="media-body"><span class="bold fontsize_12 text-uppercase grey">{`${name ? `${name} :   `: ''}`}</span><span class="bold fontsize_12">{parse(message)}</span></div></li>
            ))
        )
    }

    return (
        <div className="bottommargin_40">
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
                                        autocomplete="off"
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