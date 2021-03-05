import React, { useState, useEffect } from 'react';
import BasicInfo from '../../Components/Profile/BasicInfo';
import PersonalInfo from '../../Components/Profile/PersonalInfo';
import Questionnire from '../../Components/Profile/Questionnire';
import usersModel from '../../ApiManager/user'
import Constants from '../../Config/Constants';
import Loading from '../../Components/Loaders/Loading';
import Aux from '../../hoc/Aux';
import { toast } from 'react-toastify';
import Sidebar from '../../Components/Profile/Sidebar';


function Profile() {

    const [authUser, setauthUser] = useState({});

    useEffect(() => {
        usersModel.getAuthUser()
        .then(user => {
            setauthUser(user.data.data);
        })
        .catch(error => {
            toast.error(error);
        })
        
    }, [])


    return (
        <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
				<div className="container">
					<div className="row">
                        <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                            <div className="row">
                                <BasicInfo 
                                    name={authUser.name} 
                                    email={authUser.email} 
                                    gender={authUser.gender}
                                    DateOfBirth={authUser.dob}
                                />
                            { (authUser.role == Constants.roles.model) ? 
                                
                                <Aux>
                                    <PersonalInfo 
                                        address={authUser.address} 
                                        city={authUser.city} 
                                        state={authUser.state} 
                                        zipcode={authUser.zipcode} 
                                        country={authUser.country}
                                        phone={authUser.phone} 
                                        profilePicture={authUser.profilePicture}
                                    />
                                    <Questionnire 
                                        categories={(authUser.categories) ? authUser.categories : null}
                                        languages={(authUser.languages) ? authUser.languages : null} 
                                        ethnicity={(authUser.ethnicityResource) ? authUser.ethnicityResource.name : null} 
                                        body={authUser.body} 
                                        weight={authUser.weight} 
                                        height={authUser.height} 
                                        hairColor={authUser.hairColor} 
                                        hairLength={authUser.hairLength} 
                                        eyeColor={authUser.eyeColor} 
                                        orientation={authUser.orientation} 
                                    />
                                </Aux>
                                : null
                            }    
                            </div>    
                        </div>
                        
                        <Sidebar />
					</div>
				</div>
			</section>
    )
}

export default Profile