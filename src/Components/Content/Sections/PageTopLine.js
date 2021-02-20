import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import usersModel from '../../../ApiManager/user';
import { AppContext } from '../../../Context';
import Aux from '../../../hoc/Aux';

function PageTopLine() {

	const [isAuthenticated, setisAuthenticated] = useState(false);
	const [authUser, setauthUser] = useState(null)
	const [loading, setloading] = useState(true);

	useEffect(() => {
		let authToken = usersModel.authToken();
		if (authToken) {
			setisAuthenticated(true);

			usersModel.getAuthUser()
				.then(user => {
					setauthUser(user.data.data);
					setloading(false);
				})
				.catch(error => {
					console.log(error);
				})
		} else {
			setloading(false);
		}


	}, [])

	return (
		(loading) ? 'Loading...' :
			<section className="page_topline ds ms gorizontal_padding">
				<div className="container-fluid with_border">
					<div className="row">
						<div className="col-md-4 col-sm-6 col-xs-12 text-xs-center text-left  topmargin_0 bottommargin_0">
							<a href="#">
								<em>support@desisexichat.com</em>
							</a>
						</div>


						<div className="col-md-8 col-sm-6 col-xs-6  header-contacts text-right hidden-xs  topmargin_0 bottommargin_0">
							<div className="fontsize_14 grey">
								<AppContext.Consumer>
								{
									(contextState) => {
										return (
											(contextState.stateData.authUser) ? `Welcome ${contextState.stateData.authUser.name}` : 
											(
												<Aux>
													<Link to="/registration/user"> SignUp </Link>&nbsp;|&nbsp;
													<Link to="/registration/model"> SignUp as Model </Link>&nbsp;|&nbsp;
													<Link to="/login"> Login </Link>
												</Aux> 
											)
										)
									}
								}
								</AppContext.Consumer>
							</div>
						</div>
					</div>
				</div>
			</section>
	)
}

export default PageTopLine