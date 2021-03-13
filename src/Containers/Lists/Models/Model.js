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
import io from "socket.io-client";
import Summary from '../../../Components/Models/Summary';
import AsideModels from '../../../Components/Models/AsideModels';
import Constants from '../../../Config/Constants';

const EndPoint = Constants.chatServer

function Model() {

    const [model, setmodel] = useState({})
    const [loading, setloading] = useState(true)
    const { userId } = useParams()
    const [isuser, setisUser] = useState(true)
    const login_user = authModel.getAuthUserObj();

    useEffect(() => {
        usersModel.getUser(userId)
            .then(res => {
                setmodel(res.data.data)
                setloading(false);
            })
            .catch((error) => {
                toast.error(error.message)
            });
        if (login_user && login_user.role == 1) {

            setisUser(false)
        }
        console.log("Model loaded")
        
        return () => {
            console.log("clean model")
        }
    }, [])
    const socket = io.connect(EndPoint, {transports: [ 'websocket' ]})
    return (
        (loading) ? <Loading /> :
            <section className="ds section_padding_top_20 section_padding_bottom_50">
                <div className="container">
                    <Filters />
                    {isuser &&
                        <div className="topChatontainerrow">
                            <div className="modelPictureContainer">
                                <Article socket={socket} props={model} />
                            </div>

                            <div class="chatboxcontainer">
                                <ModelChat socket={socket} props={model} login_user={login_user} />
                            </div>
                        </div>
                    }
                    <div className="bottomSummaryContainer">
                        <div className="tabsContainer">
                            <Summary {...model} />
                        </div>
                        <div class="similarModelContainer">
                            <AsideModels />
                        </div>

                    </div>
                </div>
            </section>
    )
}

export default Model