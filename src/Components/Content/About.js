import React, { useState, useEffect } from 'react';
import contentModel from '../../ApiManager/contents'

const about = () => {

    const [content, setContent] = useState({title:'', description:''})
    
    useEffect(() => {
        contentModel.getContentBySlug('about-us')
            .then( res => {
                setContent({title:res.data.data.title, description:res.data.data.description});
            })
            .catch(error => {
                console.log(error);
            })
        
        
    },[]);

    return (
        <section className="ds intro_section">
            <div className="flexslider vertical-nav">
                <ul className="slides">
                    <li>
                        <img src="images/slide01.png" alt="" />
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 text-center text-md-right">
                                    <div className="slide_description_wrapper">
                                        <div className="slide_description">
                                            <div className="intro-layer" data-animation="slideExpandUp">
                                                <h2 className="big margin_0">About Desisexichat.com</h2>
                                                <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Someting You Need to Know</h2>
                                            </div>
                                            <div className="intro-layer" data-animation="slideExpandUp">
                                                <div dangerouslySetInnerHTML={{ __html: content.description }}></div>
                                                <a href="#" className="theme_button color1 topmargin_20">About us</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
		</section>
    );
}


export default about;