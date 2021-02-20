import React, { useState, useEffect } from 'react'
import Article from '../../../Components/Models/Article'
import Aside from '../../../Components/Models/Aside'
import Filters from '../../../Components/Search/Filters/FIlters'
import BaseComponent from '../../BaseComponent';
import usersModel from '../../../ApiManager/user';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../../Components/Loaders/Loading';
import ModelChat from "../../../Components/Chat/ModelChat";
import authModel from '../../../ApiManager/auth'
import io from "socket.io-client"
const EndPoint = "http://chatserver.desisexichat.com:8004"
//const EndPoint = "http://localhost:8004"
const socket = io.connect(EndPoint)

function Model() {

    const [model, setmodel] = useState({})
    const [loading, setloading] = useState(true)
    const { userId } = useParams()
    const [isuser, setisUser] = useState(true)
    const login_user = authModel.getAuthUserObj();

    useEffect(() => {
        usersModel.getUser(userId)
            .then( res => {
                setmodel(res.data.data)
                setloading(false);
            })
            .catch((error) => { 
                toast.error(error.message)
            });
        if(login_user && login_user.role == 1){
        
            setisUser(false)
        }   
    }, [])

    return (
        (loading) ? <Loading /> : 
        <section className="ds section_padding_top_100 section_padding_bottom_50 columns_padding_25">
            <div className="container">
                <Filters />
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8">
                        <Article socket={socket} {...model} /> 
                    </div>
                    { isuser && (
                        <div class="col-sm-4">
                            <ModelChat socket={socket}  props={model} login_user={login_user}/>
                        </div>
                    )}
                    <Aside />
                </div>
            </div>
        </section>
    )
}

export default Model