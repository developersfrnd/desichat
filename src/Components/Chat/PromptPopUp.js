import React, {useState, useEffect} from 'react';
import { Prompt } from 'react-router-dom';
import usersModel from '../../ApiManager/user';
//import { isPrompt } from 'react-dom'
const PromptPopUp = ({isDirtystatus}) => {
    const [isDirty, setDirty] = useState(false)
    useEffect(() => {
        console.log(isDirtystatus)
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
    const handleEndConcert = () => {
       (isDirty &&
            usersModel.removechatroom()
       )
    }
    return (
            <Prompt
                when={isDirty}
                message={() => 'Are you sure you want to leave this page?'}
            />
    )
}
  export default PromptPopUp