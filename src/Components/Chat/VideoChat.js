import React from 'react';
import { Link } from 'react-router-dom'

const VideoChat = ({modelname, modelroom}) => {
    return (
        <div className="col-sm-12 bottommargin_40">
            <div className="side-item event-item content-padding with_background">
                <div className="row">
                    <div className="col-md-12">
                        <div className="item-media">
                            <div className="item-content with_padding">
                                    Video Chat
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoChat;