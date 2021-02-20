import React from 'react';
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux';
import Usernav from './Sections/UserNav/UserNav';

const pageHeader = (props) => {
	return (
		<Aux>
			<header className="page_header header_darkgrey columns_padding_0 table_section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-3 col-sm-6 text-center">
							<Link to="/" className="logo logo_image">
								<img src="images/logo2.png" alt="" />
							</Link>
						</div>
						<div className="col-md-6 text-center">
							<nav className="mainmenu_wrapper">
								<ul className="mainmenu nav sf-menu">
									<li className="active">
										<Link to="/">Home</Link>
									</li>
									<li>
										<Link to="/login">Favorites</Link>
									</li>
									<li>
										<Link to="/login">Fanclubs</Link>
									</li>
									<li>
										<Link to="/videos">Videos</Link>
									</li>
									<li>
										<Link to="/contact">Support</Link>
									</li>
								</ul>
							</nav>
							<span className="toggle_menu">
								<span></span>
							</span>
						</div>

						<div className=" col-md-3 col-sm-4 text-xs-center text-right mobileTopMargin">
							<ul className="inline-dropdown inline-block">
								<li className="dropdown login-dropdown">
									<a className="topline-button" id="login" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">
										<i className="rt-icon2-user"></i>
									</a>
									<Usernav />
								</li>
								<li className="dropdown">
									<a href="#" className="search_modal_button topline-button">
										<i className="rt-icon2-search2"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
		</Aux>
	)
}


export default pageHeader;