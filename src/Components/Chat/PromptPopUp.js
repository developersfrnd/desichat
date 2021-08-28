import React, {useState, useEffect} from 'react';
import { Prompt } from 'react-router';
import { io } from 'socket.io-client';
import usersModel from '../../ApiManager/user';

const PromptPopUp = ({isDirtystatus, modelroom, socket}) => {
    const [isDirty, setDirty] = useState(false)
    const [room, setRoom] = useState(modelroom)
    useEffect(() => {
        setDirty(isDirtystatus) 
        window.addEventListener('beforeunload', alertUser)
        window.addEventListener('unload', handleEndConcert)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
            window.removeEventListener('unload', handleEndConcert)
            handleEndConcert()                       
        }
    }, [isDirty])
    const alertUser = e => {       
        e.preventDefault()
        e.returnValue = ''
    }
    const handleEndConcert = (e) => {
        if(isDirty){
            socket.emit("leaveroom", room)
        }
    }
    return (
            <Prompt
                when={isDirty}
                message={() => 'Are you sure you want to leave this page?'}
            />
    )
}
  export default PromptPopUp