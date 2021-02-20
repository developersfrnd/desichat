import React from 'react';
import { Link } from 'react-router-dom'
import BaseComponent from '../../../../Containers/BaseComponent'
import { AppContext } from '../../../../Context'
import Aux from '../../../../hoc/Aux';
import authModel from '../../../../ApiManager/auth';

class Usernav extends BaseComponent {

    static contextType = AppContext;
    constructor() {
        super();

    }

    render() {
        let minWidth = (!authModel.getAuthToken()) ? "250px" : "500px";
        return (
            <div className="dropdown-menu topSignupNav" aria-labelledby="tab" id="tab"
            >
                {
                    (!authModel.getAuthToken()) ?
                        <Aux>
                            <ul>
                                <li><Link to="/registration/user"> SignUp </Link></li>
                                <li><Link to="/registration/model"> SignUp as Model </Link></li>
                                <li><Link to="/login"> Login </Link></li>
                            </ul>
                        </Aux> :

                        (authModel.isCustomerLogin()) ?
                            <Aux>
                                <ul>
                                    <li><Link to="/Profile"> Manage Profile </Link></li>
                                    <li><Link to="/logout"> Logout </Link></li>
                                </ul>
                            </Aux>
                            :

                            <Aux>
                                <ul>
                                    <li><Link to="/Profile"> Manage Profile </Link></li>
                                    <li><Link to="/gallery"> Manage Gallery </Link></li>
                                    <li><Link to="/myvideos"> Manage Videos </Link></li>
                                    <li><Link to="/logout"> Logout </Link></li>
                                </ul>
                            </Aux>
                }

            </div>
        )
    }
}

export default Usernav;