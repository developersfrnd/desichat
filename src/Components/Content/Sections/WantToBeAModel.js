import React from 'react';

const wantToBeAModel = () => {
    return ( 
        <section className="ds parallax calltoaction section_padding_100" style={{"backgroundImage": "url('images/parallax/call_to_action_2.jpg')"}} >
        <div className="container">
            <div className="row topmargin_60 bottommargin_60">
                <div className="col-sm-12 text-center">
                    <h2 className="extra-big topmargin_0 bottommargin_30">Do You want to be a
                        <span className="highlight">Model?</span>
                    </h2>
                    <div className="row">
                        <div className="col-md-offset-2 col-md-8 text-center">
                            <p className="fontsize_20">
                                If you are participants, Must be 18 or older, regardless of your local age of majority.									</p>
                            <p className="fontsize_20">Do not share any kind of contact information or personally identifiable information, whether it is yours or belongs to someone else.</p>
                        </div>
                    </div>
                    <div className="widget widget_mailchimp topmargin_20">
                        <form className="signup form-inline" action="" method="get">
                            <div className="form-group">
                                <input name="email" type="email" className="mailchimp_email form-control" placeholder="Email address" />
                            </div>
                            <button type="submit" className="theme_button input_button">Send</button>
                            <div className="response"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default wantToBeAModel;