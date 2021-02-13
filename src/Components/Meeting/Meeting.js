import React, { useState, useEffect } from 'react'

import scheduleModel from '../../ApiManager/scheduleModel';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Channel from './Channel';
import usersModel from '../../ApiManager/user';


function Meeting() {

    const [opentokSessionId, setopentokSessionId] = useState('')
    const [opentokSesionToken, setopentokSesionToken] = useState('')
    const { scheduleId } = useParams();
    const [inprogress, setinprogress] = useState(true)
    const [isValidCustomer, setisValidCustomer] = useState(false)


    const isValidCustomerToJoin = () => {
        
    }

    const isValidModelToPublish = () => {
        
    }

    useEffect(() => {
        let data = {'scheduleId':scheduleId}
        scheduleModel.updateSchedule(data)
            .then((res) => {
                setopentokSessionId(res.data.data.channelSessionId);
                setopentokSesionToken(res.data.data.channelToken)
                setinprogress(false);
            })
            .catch(error => {
                toast.error(error);
                setinprogress(false);
            })
        
    }, [])

    return (
        (inprogress) ? 'Loading...' :
        <section className="ds section_padding_70">
            <div className="container">
                <div className="row">
                    <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
                        <Channel opentokSessionId={opentokSessionId} opentokSesionToken={opentokSesionToken} />
                    </div>
                </div> 
            </div> 
        </section>           
    )
}

export default Meeting
