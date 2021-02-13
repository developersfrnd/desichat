import React from 'react';
import { Link } from 'react-router-dom'
import BaseComponent from '../../../../Containers/BaseComponent'
import { AppContext } from '../../../../Context'
import Aux from '../../../../hoc/Aux';
import authModel from '../../../../ApiManager/auth';

class Usernav extends BaseComponent {
    
    static contextType = AppContext;
    constructor(){
        super();

    }

    render(){
        let minWidth = (!authModel.getAuthToken()) ? "430px" : "500px";
        return (
            <div className="dropdown-menu" aria-labelledby="tab" id="tab" style={{fontWeight:'400', fontSize:'15px', paddingLeft:'20px',minWidth:minWidth,boxShadow:'2px 2px 4px 0px #575757;z-index: 999999'}}>
            {
                (!authModel.getAuthToken()) ?
                    <Aux>
                        <Link to="/registration/user"> SignUp </Link>&nbsp;|&nbsp;
                        <Link to="/registration/model"> SignUp as Model </Link>&nbsp;|&nbsp;
                        <Link to="/login"> Login </Link>
                    </Aux> : 
                    
                    (authModel.isCustomerLogin()) ?
                    <Aux>
                        <Link to="/Profile"> Manage Profile </Link>&nbsp;|&nbsp;
                        <Link to="/logout"> Logout </Link>
                    </Aux>
                    :

                    <Aux>    
                        <Link to="/Profile"> Manage Profile </Link>&nbsp;|&nbsp;
                        <Link to="/gallery"> Manage Gallery </Link>&nbsp;|&nbsp;
                        <Link to="/myvideos"> Manage Videos </Link>&nbsp;|&nbsp;
                        <Link to="/logout"> Logout </Link>
                    </Aux>    
            }
            
            </div>
        )
    }
}

export default Usernav;