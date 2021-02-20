import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import usersModel from '../../../ApiManager/user';
import Aux from '../../../hoc/Aux';

function PageTopLine() {

	const [isAuthenticated, setisAuthenticated] = useState(false);
	const [authUser, setauthUser] = useState(null)
    const [loading, setloading] = useState(true);

	useEffect(() => {
        let authToken = usersModel.authToken();
		if(authToken){ 
            setisAuthenticated(true);

			usersModel.getAuthUser()
			.then(user => {
				console.log("Hello",user.data.data);
				setauthUser(user.data.data);
				setloading(false);
			})
			.catch(error => {
				console.log(error);
			})
		}else{
			setloading(false);
		}
         
        
    }, [])

	return (
			(loading) ? 'page Loading...' : 
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
								{ 
									(isAuthenticated) ? `Welcome ${authUser.name}` :
									
									(
										<Aux>
											<Link to="/registration/user"> SignUp </Link>&nbsp;|&nbsp;
											<Link to="/registration/model"> SignUp as Model </Link>&nbsp;|&nbsp;
											<Link to="/login"> Login </Link>
										</Aux> 
									)
								
								}
							</div>
						</div>
					</div>
				</div>
			</section>
	)
}

export default PageTopLine