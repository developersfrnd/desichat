import React, { useState } from 'react'
import { OTPublisher } from 'opentok-react'
import CheckBox from './CheckBox'

function Publisher() {

    const [error, seterror] = useState(null);
    const [audio, setaudio] = useState(true)
    const [video, setvideo] = useState(true)
    const [videoSource, setvideoSource] = useState('camera')

    const onError = (err) => {
        seterror(`Failed to publish: ${err.message}`)
    }

    const changeVideoSource = (videoSource) => {
        (videoSource !== 'camera') ? setvideoSource('camera') : setvideoSource('screen')
    }

    return (
        <div className="publisher">
            {error}
           <OTPublisher 
                properties={{
                    publishAudio: {audio},
                    publishVideo: {video},
                    videoSource: videoSource === 'screen' ? 'screen' : undefined
                }}
                onError={onError} 
           /> 

            <CheckBox
            label="Share Screen"
            initialChecked={videoSource}
            onChange={changeVideoSource}
            />
            <CheckBox
            label="Publish Audio"
            initialChecked={audio}
            onChange={setaudio}
            />
            <CheckBox
            label="Publish Video"
            initialChecked={video}
            onChange={setvideo}
            />
        </div>
    )
}

export default Publisher
