import React, { memo } from 'react'

const pageNotFound = () => {
    return (
        <section className="ds section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p className="not_found">
                            <span className="grey">404</span>
                        </p>
                        <h2 className="muellerhoff highlight">Oops, page not found!</h2>
                        <p className="bottommargin_5">
                            <a href="/" className="theme_button inverse">Go To Home</a>
                        </p>
                    </div>
                </div>
            </div><br /><br /><br /><br /><br /><br /><br /><br />
        </section>
    )
}


export default pageNotFound