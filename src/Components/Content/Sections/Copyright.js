import React from 'react';
import Aux from '../../../hoc/Aux';
import { Link } from 'react-router-dom';

const copyright = () => {
    return (
	<Aux>
		<section className="ds ms section_padding_30 page_social">
			<div className="container">
				<div className="row topmargin_20 bottommargin_10">
					<div className="col-sm-8 text-left">
							<ul className="footer-links">
								<li>
									<Link to="/login">Model Login</Link>
								</li>
								<li>
									<Link to="/registration/model">Model Registration</Link>
								</li>
								<li>
									<Link to="/faq">FAQ</Link>
								</li>
								<li>
									<Link to="/content/terms">Terms & Conditions </Link>
								</li>
								<li>
									<Link to="/content/privacy">Privacy Policy </Link>
								</li>
								<li>
									<Link to="/contact">Support</Link>
								</li>
							</ul>
					</div>
					<div className="col-sm-4 text-right">
						<div className="page_social_icons">
							<a className="social-icon color-bg-icon soc-facebook" href="#" title="Facebook"></a>
							<a className="social-icon color-bg-icon soc-twitter" href="#" title="Twitter"></a>
							<a className="social-icon color-bg-icon soc-google" href="#" title="Google"></a>
						</div>
					</div>
					<p>Disclaimer: All members and persons appearing on this site have contractually represented to us that they are 18 years of age or older.</p>
				</div>
			</div>
		</section>

        <section className="ds page_copyright section_padding_20 gorizontal_padding table_section">
				<div className="container-fluid">
					<div className="row topmargin_10 bottommargin_10">
						<div className="col-sm-6 text-center text-md-left">
							<p className="darklinks">&copy; desisexichat.com 2020 | All Right Reserved</p>
						</div>
						<div className="col-sm-6 text-center text-md-right">
							<div className="size_small inline-block">
								<i className="fa fa-cc-visa"></i>
								<i className="fa fa-cc-discover"></i>
								<i className="fa fa-cc-mastercard"></i>
								<i className="fa fa-cc-amex"></i>
								<i className="fa fa-cc-paypal"></i>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Aux>
    )
}

export default copyright