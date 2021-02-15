import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
const EndPoint = 'http://localhost:8003'
let socket
const ModelChat = ({props, login_user}) => {
    let guestuser = 'guest-'+generate(6)
    if(login_user){
        guestuser = login_user.name
    }
    const [state, setState] = useState({message:''});
    const [chat, setChat] = useState([]);
    const [model, setModel] = useState(props.name)
    const [room, setRoom] = useState(props.room)
    const [name, setName] = useState(guestuser)
   
    useEffect(() => { 
        socket = io.connect(EndPoint)
        socket.emit('join',{name, room, model}) // Join user 
        socket.on('message', ({name, message}) => {
            setChat([...chat, {name, message}])            
        })
    },[props])

    useEffect(() => {  
        socket.on('receivemessage', ({name, message}) => {
            setChat([...chat, {name, message}])
            var elem = document.getElementById('chatmessage');
            elem.scrollTop = elem.scrollHeight;
        })
    }, [chat])
    
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
    return (
            
        <section>
                <div class="row">
                    <div class="col-md-16">
                        <div class="item-media">
                            <div class="item-content chat-body" id="chatmessage">
                            <ul class="media-list">
                                {renderChat()}
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-16">
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