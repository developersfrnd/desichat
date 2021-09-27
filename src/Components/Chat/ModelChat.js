import React, { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser'
import authModel from '../../ApiManager/auth';

const ModelChat = ({ coin, socket, props}) => {
    const [state, setState] = useState({ message: '' });
    const [chat, setChat] = useState([]);
    const [model, setModel] = useState(props.name)
    const [room, setRoom] = useState(props.id)
    const [name, setName] = useState('')
    let guestuser = React.useRef('')

    useEffect(() => {
        async function getLoginUser() {
            let response = await authModel.getAuthUserObj()
            return response            
        }
        getLoginUser().then((res)=>{
            guestuser.current = 'guest-' + generate(6)
            if(res){
                guestuser.current = res.name;
            }
            socket.emit('join', guestuser.current, room, model) // Join user 
        })               
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
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const onMessageSubmit = (e) => {
        e.preventDefault()
        const { message } = state
        if (message) {
            socket.emit('sendmessage', room, guestuser.current, message)
            setState({ message: '' });
        }
    }
    const renderChat = () => {
        return (
            chat.map(({ name, message }, index) => (
                <li class="media" key={index}><div class="media-body"><span class="bold fontsize_12 text-uppercase grey">{`${name ? `${name} :   `: ''}`}</span><span class="bold fontsize_12">{parse(message)}</span></div></li>
            ))
        )
    }
    return (

        <section>


            <div class="item-media">
                <div class="item-content balance-coin">
                    <span class="txt">Balance:</span>
                    <span class="msg-balance" id="msg-balance">{coin} Coins</span>
                </div>
                <div class="item-content chat-body" id="chatmessage">
                    <ul class="media-list">
                        {renderChat()}
                    </ul>
                </div>
            </div>
            <form className="contact-form messageChatBelow" method="post" onSubmit={onMessageSubmit}>
                <input type="hidden" name="_method" value="PUT" />
                <input
                    type="text"
                    name="message"
                    autocomplete="off"
                    onChange={e => TextChange(e)}
                    value={state.message}
                    className="form-control"
                    placeholder="message"
                />
                <button class="theme_button color1">Send</button>
            </form>

        </section>
    )
}

function generate(n) {
    var add = 1,
        max = 12 - add;

    if (n > max) {
        return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically 
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}

export default ModelChat;
