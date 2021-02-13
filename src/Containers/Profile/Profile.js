import React, { Component } from 'react';
import BaseComponent from '../BaseComponent';
import Sidebar from '../../Components/Profile/Sidebar';
import BasicInfo from '../../Components/Profile/BasicInfo';
import PersonalInfo from '../../Components/Profile/PersonalInfo';
import Questionnire from '../../Components/Profile/Questionnire';
import usersModel from '../../ApiManager/user'
import Constants from '../../Config/Constants';
import {AppContext} from '../../Context';
import Loading from '../../Components/Loaders/Loading';
import Aux from '../../hoc/Aux';

class Profile extends BaseComponent {
    
    static contextType = AppContext;
    
    constructor() {
        super()
        this.state = {
            user: {},
            loading:true
        }
    }

    componentDidMount(){
        usersModel.getAuthUser()
            .then( response => {
                    this.setState({
                    ...this.state,
                    user: response.data.data,
                    loading:false
                })
			})
			.catch((error) => { 
				this.showMessage(error);
			});
    }

    render() {
        return (
            (this.state.loading) ? <Loading /> : 
            <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
				<div className="container">
					<div className="row">
                        <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                            <div className="row">
                                <BasicInfo 
                                    name={this.state.user.name} 
                                    email={this.state.user.email} 
                                    gender={this.state.user.gender}
                                    DateOfBirth={this.state.user.dob}
                                />
                            { (this.state.user.role == Constants.roles.model) ? 
                                
                                <Aux>
                                    <PersonalInfo 
                                        address={this.state.user.address} 
                                        city={this.state.user.city} 
                                        state={this.state.user.state} 
                                        zipcode={this.state.user.zipcode} 
                                        country={this.state.user.country}
                                        phone={this.state.user.phone} 
                                        profilePicture={this.state.user.profilePicture}
                                    />
                                    <Questionnire 
                                        categories={(this.state.user.categories) ? this.state.user.categories : null}
                                        languages={(this.state.user.languages) ? this.state.user.languages : null} 
                                        ethnicity={(this.state.user.ethnicityResource) ? this.state.user.ethnicityResource.name : null} 
                                        body={this.state.user.body} 
                                        weight={this.state.user.weight} 
                                        height={this.state.user.height} 
                                        hairColor={this.state.user.hairColor} 
                                        hairLength={this.state.user.hairLength} 
                                        eyeColor={this.state.user.eyeColor} 
                                        orientation={this.state.user.orientation} 
                                    />
                                </Aux>
                                : null
                            }    
                            </div>    
                        </div>
                        
                        <Sidebar profilePicture={this.state.user.profilePicture} userRole={this.state.user.role}  />
					</div>
				</div>
			</section>
        );
    }
}

export default Profile;