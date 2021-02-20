import React from 'react';

const addStrip = () => {
    return (
        <section className="ds column_margin_0 section_padding_bottom_20">
            <div className="container">
                <div className="row">
                    <div>
                        <div className="flexslider banner-slider">
                            <ul className="slides">
                                <li className="gradient_bg_goriz">
                                    <div className="bg_overlay"></div>
                                    <img src="../images/banner_slide_01.jpg" alt="" />
                                    <div className="media-links">
                                        <a className="abs-link" href="#"></a>
                                    </div>
                                </li>
                                <li className="gradient_bg_goriz">
                                    <div className="bg_overlay"></div>
                                    <img src="../images/banner_slide_02.jpg" alt="" />
                                    <div className="media-links">
                                        <a className="abs-link" href="#"></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default addStrip;