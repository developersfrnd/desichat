import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import authModel from '../../../ApiManager/auth';


function PageTopLine() {

	//const [isAuthenticated, setisAuthenticated] = useState(false);
	const [loading, setloading] = useState(false);
	
	const isAuthenticated = (authModel.getAuthToken()) ? true : false;
	
	return (
			<section className="page_topline ds ms gorizontal_padding">
				<div className="container-fluid with_border">
					<div className="row">
						<div className="col-md-4 col-sm-6 col-xs-12 text-xs-center text-left  topmargin_0 bottommargin_0">
							<a href="#">
								<em>support@desisexichat.com</em>
							</a>
						</div>


						<div className="col-md-8 col-sm-6 col-xs-6  header-contacts text-right hidden-xs  topmargin_0 bottommargin_0">
						{(loading) ? '<Loading />...' :
							<div className="fontsize_14 grey">
								{
								(isAuthenticated) ? '' : 
									<>
										<Link to="/registration/user"> SignUp </Link>&nbsp;|&nbsp;
										<Link to="/registration/model"> SignUp as Model </Link>&nbsp;|&nbsp;
										<Link to="/login"> Login </Link>
									</>	
								}
							</div>
						}
						</div>
					</div>
				</div>
			</section>
	)
}

export default PageTopLine