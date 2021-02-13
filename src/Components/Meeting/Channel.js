import React, { useState } from 'react'
import { OTSession, OTSubscriber, OTPublisher, OTStreams, preloadScript } from 'opentok-react';
import Constants from '../../Config/Constants';
import ConnectionStatus from './ConnectionStatus';
import Publisher from './Publisher';
import Subscriber from './Subscriber';

function Channel(props) {

    const [error, seterror] = useState(null)
    const [connected, setconnected] = useState(false)

    const sessionEvents = {
        sessionConnected : () => {
            setconnected(true);
        },
        sessionDisconnected : () => {
            setconnected(false);
        }
    }

    const onError = (err) => {
        seterror(`Failed to connect: ${err.message}`);
    }
    
    return (
        <OTSession
            apiKey={Constants.OpenTokKeys.TOKBOX_API_KEY} 
            sessionId={props.opentokSessionId} 
            token={props.opentokSesionToken}
            eventHandlers={sessionEvents}
            onError={onError}
        >
            <OTPublisher properties={{width:"750px", height:"500px", resolution:"640x480"}} />
            <OTStreams>
                <OTSubscriber />
            </OTStreams>
        </OTSession>
    )
}

export default preloadScript(Channel)