import React from 'react';
import Profile from './TabsContent/Profile'
import Photos from '../../Containers/Lists/Models/TabContents/Photos'
import Videos from '../../Containers/Lists/Models/TabContents/Videos'
import Comments from '../../Containers/Lists/Models/TabContents/Comments'

const summary = (props) => {
    return (
        <div className="item-content entry-content ">
            <div className="">
                <div className="">
                    <div className="to_animate" data-animation="scaleAppear">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="active">
                                <a href="#tab1" role="tab" data-toggle="tab">Profile</a>
                            </li>
                            <li>
                                <a href="#tab2" role="tab" data-toggle="tab">Photograph</a>
                            </li>
                            <li>
                                <a href="#tab3" role="tab" data-toggle="tab">Videos</a>
                            </li>
                            <li>
                                <a href="#tab4" role="tab" data-toggle="tab">Shows</a>
                            </li>
                            <li>
                                <a href="#tab5" role="tab" data-toggle="tab">Comments</a>
                            </li>
                        </ul>

                        <div className="tab-content no-border top-color-border">
                            <div className="tab-pane fade in active" id="tab1">
                                <Profile {...props} />
                            </div>

                            <div className="tab-pane fade" id="tab2">
                                <Photos />
                            </div>

                            <div className="tab-pane fade in" id="tab3">
                                <Videos />
                            </div>
                            <div className="tab-pane fade in" id="tab4">
                                Shows Tab
                            </div>
                            <div className="tab-pane fade in" id="tab5">
                                <Comments model_id={props.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default summary;