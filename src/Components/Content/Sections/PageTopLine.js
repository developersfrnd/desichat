import React, { Component } from 'react';
import { Route ,Link, Switch } from 'react-router-dom'
import { AppContext } from '../../../Context';
import Aux from '../../../hoc/Aux';

class PageTopLine extends Component {
	render() {
    return (
        <section className="page_topline ds ms gorizontal_padding table_section">
				<div className="container-fluid with_border">
					<div className="row">
						<div className="col-sm-4 col-md-3 col-lg-2 text-xs-center text-left text-lg-right">
							<a href="#">
								<em>support@desisexichat.com</em>
							</a>
						</div>

						
						<div className="col-md-3 col-sm-6 header-contacts text-center hidden-xs">
							<div className="fontsize_20 grey topmargin_-5">
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