import React, { useState } from 'react'
import { OTSubscriber } from 'opentok-react';
import CheckBox from './CheckBox';


function Subscriber() {

    const [error, seterror] = useState(null);
    const [audio, setaudio] = useState(true)
    const [video, setvideo] = useState(true)
    
    const onError = (err) => {
        seterror(`Failed to subscribe: ${err.message}`)
    }

    return (
        <div className="subscriber">
            {error}
            <OTSubscriber 
                properties={{
                    subscribeToAudio: {audio},
                    subscribeToVideo: {video}
                  }}
                  onError={onError}
            />

            <CheckBox
            label="Subscribe to Audio"
            initialChecked={audio}
            onChange={setaudio}
            />
            <CheckBox
            label="Subscribe to Video"
            initialChecked={video}
            onChange={setvideo}
            />
        </div>
    )
}

export default Subscriber
