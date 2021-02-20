import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { AppContext } from '../../../Context';
import Aux from '../../../hoc/Aux';

class PageTopLine extends Component {
	render() {
		return (
			<section className="page_topline ds ms gorizontal_padding">
				<div className="container-fluid with_border">
					<div className="row">
						<div className="col-md-4 col-sm-6 col-xs-12 text-xs-center text-left  topmargin_0 bottommargin_0">
							<a href="#">
								<em>support@desisexichat.com</em>
							</a>
						</div>


						<div className="col-md-8 col-sm-6 col-xs-6  header-contacts text-center hidden-xs  topmargin_0 bottommargin_0">
							<div className="fontsize_20 grey">
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
}


export default PageTopLine;