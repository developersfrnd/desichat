import React from 'react'
import Booking from '../Forms/Bookings/Booking'

const aside = () => {
    return (
        <aside className="col-sm-5 col-md-4 col-lg-4">
            <div className="with_background with_padding">
            <Booking />
            </div>
            <div className="with_background with_padding">
                <div className="widget widget_categories">
                    <h3 className="widget-title">Navigation</h3>
                    <ul>
                        <li>
                            <a href="blog-right.html" title="">Categories</a>
                            <span className="grey">(23)</span>
                        </li>
                        <li>
                            <a href="blog-right.html" title="">Orientation</a>
                            <span className="grey">(50)</span>
                        </li>
                        <li>
                            <a href="blog-right.html" title="">Latest Language</a>
                            <span className="grey">(5)</span>
                        </li>
                        <li>
                            <a href="blog-right.html" title="">Ethnicity</a>
                            <span className="grey">(70)</span>
                        </li>
                        <li>
                            <a href="blog-right.html" title="">Popularity</a>
                            <span className="grey">(216)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="with_background with_padding">
                <div className="widget widget_popular_entries">
                    <h3 className="widget-title">Similar Models</h3>
                    <ul className="media-list darklinks">
                        <li className="media">
                            <a className="media-left" href="blog-single-right.html">
                                <img className="media-object" src="images/recent_post1.jpg" alt="" />
                            </a>
                            <div className="media-body">
                                <p>
                                    <a href="blog-single-right.html">Eod tempor invidunt labore dolore magna</a>
                                </p>
                                <div className="star-rating" title="Rated 5 out of 5">
                                    <span style={{width:'100%'}}>
                                        <strong className="rating">5</strong> out of 5
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default aside