import React, { Component } from 'react';
import Select from '../../Forms/Select/Select'
import Constants from '../../../Config/Constants'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import validateOnSubmit from '../ValidateOnSubmit'
import validate from '../Validator'
import BaseComponent from '../../../Containers/BaseComponent';
import {AppContext} from '../../../Context';
import ShowError from '../ShowError';
import Loading from '../../Loaders/Loading';
import { getCategories } from '../../../ApiManager/categories'
import { getEthnicities } from '../../../ApiManager/ethnicities'
import { getLanguages } from '../../../ApiManager/languages'
import usersModel from '../../../ApiManager/user'

class Questionnire extends BaseComponent {
    static contextType = AppContext; 
    constructor() {
        super();
        this.state = {
            formSubmitted:false,
            formError:null,
            loading:false,
            questionnireForm: {
                'categories': {
                    value:[],
                    options: [{value: '', displayValue: 'Select Category' }],
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'languages': {
                    value:[],
                    options: [{value: '', displayValue: 'Select Languages' }],
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'ethnicity': {
                    value:'',
                    options: [{value: '', displayValue: 'Select Ethnicity' }],
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'body': {
                    value:'',
                    options: Constants.body,
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'weight': {
                    value:'',
                    options: Constants.weight(),
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'height': {
                    value:'',
                    options: Constants.height(),
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'hairLength': {
                    value:'',
                    options: Constants.hairLength,
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'hairColor': {
                    value:'',
                    options: Constants.hairColor,
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'eyeColor': {
                    value:'',
                    options: Constants.eyeColor,
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },
                'orientation': {
                    value:'',
                    options: Constants.orientation,
                    touched:false,
                    valid:false,
                    validationRules: {
                        isRequired: true
                    }
                },

            }
        }
    }

    componentDidMount(){

        let categoriesOptions = [{value: '', displayValue: 'Select Category' }];
        let ethnicityOptions = [{value: '', displayValue: 'Select Ethnicity' }];
        let languagesOptions = [{value: '', displayValue: 'Select Languages' }];
        
        let updatdState = { ...this.state }
        let qf = {...this.state.questionnireForm };
        Promise.all([getCategories(), getEthnicities(), getLanguages(),usersModel.getAuthUser()])
            .then( results => {

                results[0].data.data.map(category => {
                    categoriesOptions.push({value:category.id,  displayValue: category.name})
                })
                results[1].data.data.map(ethnicity => {
                    ethnicityOptions.push({value:ethnicity.id,  displayValue: ethnicity.name})
                })
                results[2].data.data.map(language => {
                    languagesOptions.push({value:language.id,  displayValue: language.name})
                })

                let authUser = results[3].data.data;

                updatdState['questionnireForm']['categories'] = {...qf.categories,value:authUser.categoriesArr, options:categoriesOptions, touched:(authUser.categories) ? true : false, valid: (authUser.categories) ? true : false};
                updatdState['questionnireForm']['ethnicity'] = {...qf.ethnicity,value:authUser.ethnicity, options:ethnicityOptions, touched:(authUser.ethnicity) ? true : false, valid: (authUser.ethnicity) ? true : false};
                updatdState['questionnireForm']['languages'] = {...qf.languages,value:authUser.languagesArr, options:languagesOptions, touched:(authUser.languages) ? true : false, valid: (authUser.languages) ? true : false};
                updatdState['questionnireForm']['body'] = {...qf.body,value:authUser.body, touched:(authUser.body) ? true : false, valid: (authUser.body) ? true : false};
                updatdState['questionnireForm']['weight'] = {...qf.weight,value:authUser.weight, touched:(authUser.weight) ? true : false, valid: (authUser.weight) ? true : false};
                updatdState['questionnireForm']['height'] = {...qf.height,value:authUser.height, touched:(authUser.height) ? true : false, valid: (authUser.height) ? true : false};
                updatdState['questionnireForm']['hairColor'] = {...qf.hairColor,value:authUser.hairColor, touched:(authUser.hairColor) ? true : false, valid: (authUser.hairColor) ? true : false};
                updatdState['questionnireForm']['hairLength'] = {...qf.hairLength,value:authUser.hairLength, touched:(authUser.hairLength) ? true : false, valid: (authUser.hairLength) ? true : false};
                updatdState['questionnireForm']['eyeColor'] = {...qf.eyeColor,value:authUser.eyeColor, touched:(authUser.eyeColor) ? true : false, valid: (authUser.eyeColor) ? true : false};
                updatdState['questionnireForm']['orientation'] = {...qf.orientation,value:authUser.orientation, touched:(authUser.orientation) ? true : false, valid: (authUser.orientation) ? true : false};

                this.setState(updatdState)
            })
            .catch(error => {
                this.showMessage(error);
            });
    }

    changeEventHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        let updatedStateObject = { ...this.state.questionnireForm }
        let updatedElementObject = { ...updatedStateObject[name] };
        
        updatedElementObject.touched = true;
        updatedElementObject.value = value

        let validatorRes = validate(updatedElementObject.value,updatedElementObject.validationRules);
        updatedElementObject.valid = validatorRes.isValid;

        updatedStateObject[name] = updatedElementObject;

        this.setState({
            formError: null,
            questionnireForm : updatedStateObject
        });
    }

    multipleSelecthandleChange  = (event) => {
        const name = event.target.name;
        
        let updatedStateObject = { ...this.state.questionnireForm }
        let updatedElementObject = { ...updatedStateObject[name] };

        let value = Array.from(event.target.selectedOptions, (item) => item.value);

        updatedElementObject.touched = true;
        updatedElementObject.value = value

        let validatorRes = validate(updatedElementObject.value,updatedElementObject.validationRules);
        updatedElementObject.valid = validatorRes.isValid;

        updatedStateObject[name] = updatedElementObject;
        
        this.setState({
            formError: null,
            questionnireForm : updatedStateObject
        });
    }

    checkValidation = () => {
        let isFormValid = true;
        
        let validatorObj = validateOnSubmit(this.state.questionnireForm);
        console.log("validatorObj",validatorObj)
        isFormValid = validatorObj.isFormValid;
        if(!isFormValid){
            this.setState({questionnireForm : validatorObj.updatedState, formError: validatorObj.message})
        }

        if(isFormValid){
            isFormValid = (this.state.formError) ? false : true;
        }

        return isFormValid;
    }

    submitEventHandler = (event) => {
        event.preventDefault();
        if(this.checkValidation()){

            let formData = new FormData(document.getElementById('questionnireForm'));
            formData.append('categories',[this.state.questionnireForm.categories.value])
            formData.append('languages',[this.state.questionnireForm.languages.value])

            this.setState({loading:true})
            axios.post(
                    `${Constants.apiEndPoint}users/${this.context.stateData.authUser.id}`,
                    formData,
                    this.axiosConfig()
                )
                .then( response => {
                    this.setState({formSubmitted:true})

                    let updatedAuthUser = {...this.context.stateData.authUser,
                        categories: response.data.data.categories,
                        languages: response.data.data.languages,
                        ethnicity: response.data.data.ethnicity,
                        body: response.data.data.body,
                        weight: response.data.data.weight,
                        height: response.data.data.height,
                        hairColor: response.data.data.hairColor,
                        hairLength: response.data.data.hairLength,
                        eyeColor: response.data.data.eyeColor,
                        orientation: response.data.data.orientation
                    }

                    this.setState({loading:false})
                    this.setContextState({authUser:updatedAuthUser,redirect:'/profile'})
                })
                .catch(error => {
                    this.showMessage(error);
                });
        }        
    }

    render(){
        return (
            (this.state.loading) ? <Loading /> :
            <section className="ds section_padding_70">
                {this.pageRedirection()}
                <div className="container">
					<div className="row">
						<div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
							<h2 className="big margin_0">Questionnire</h2>
							<h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Questionnire Form</h2>

                            <ShowError message={this.state.formError} />
							<form id="questionnireForm" className="contact-form" method="post" onSubmit={ this.submitEventHandler }>
                                <input type="hidden" name="_method" value="PUT" />
                                <Select 
                                    value={this.state.questionnireForm.categories.value} 
                                    name="categories"
                                    multiple={true}
                                    options={this.state.questionnireForm.categories.options} 
                                    onChange={this.multipleSelecthandleChange } 
                                    touched={this.state.questionnireForm.categories.touched}
                                    valid={this.state.questionnireForm.categories.valid} 
                                />
                               
                               <Select 
                                    value={this.state.questionnireForm.ethnicity.value} 
                                    name="ethnicity" 
                                    options={this.state.questionnireForm.ethnicity.options} 
                                    onChange={this.changeEventHandler } 
                                    touched={this.state.questionnireForm.ethnicity.touched}
                                    valid={this.state.questionnireForm.ethnicity.valid} 
                                />

                                <Select 
                                    value={this.state.questionnireForm.languages.value} 
                                    name="languages"
                                    multiple={true} 
                                    options={this.state.questionnireForm.languages.options} 
                                    onChange={this.multipleSelecthandleChange } 
                                    touched={this.state.questionnireForm.languages.touched}
                                    valid={this.state.questionnireForm.languages.valid} 
                                />

                                <Select 
                                    value={this.state.questionnireForm.body.value} 
                                    name="body"  
                                    options={this.state.questionnireForm.body.options} 
                                    onChange={this.changeEventHandler } 
                                    touched={this.state.questionnireForm.body.touched}
                                    valid={this.state.questionnireForm.body.valid} 
                                />

                                <Select 
                                    value={this.state.questionnireForm.weight.value} 
                                    name="weight" 
                                    options={this.state.questionnireForm.weight.options} 
                                    onChange={this.changeEventHandler } 
                                    touched={this.state.questionnireForm.weight.touched}
                                    valid={this.state.questionnireForm.weight.valid} 
                                />
                                
                                <Select 
                                    value={this.state.questionnireForm.height.value} 
                                    name="height" 
                                    options={this.state.questionnireForm.height.options} 
                                    onChange={this.changeEventHandler } 
                                    touched={this.state.questionnireForm.height.touched}
                                    valid={this.state.questionnireForm.height.valid} 
                                />
                                
                                <Select 
                                    value={this.state.questionnireForm.hairLength.value} 
                                    name="hairLength" 
                                    options={this.state.questionnireForm.hairLength.options} 
                                    onChange={this.changeEventHandler } 
                                    touched={this.state.questionnireForm.hairLength.touched}
                                    valid={this.state.questionnireForm.hairLength.valid} 
                                />
                                
                                <Select 
                                    value={this.state.questionnireForm.hairColor.value} 
                                    name="hairColor" 
                                    options={this.state.questionnireForm.hairColor.options} 
                                    onChange={this.changeEventHandler } 
                                    touched={this.state.questionnireForm.hairColor.touched}
                                    valid={this.state.questionnireForm.hairColor.valid} 
                                />
                                
                                <Select 
                                    value={this.state.questionnireForm.eyeColor.value} 
                                    name="eyeColor" 
                                    options={this.state.questionnireForm.eyeColor.options} 
                                    onChange={this.changeEventHandler } 
                                    touched={this.state.questionnireForm.eyeColor.touched}
                                    valid={this.state.questionnireForm.eyeColor.valid} 
                                />
                                
                                <Select 
                                    value={this.state.questionnireForm.orientation.value} 
                                    name="orientation" 
                                    options={this.state.questionnireForm.orientation.options} 
                                    onChange={this.changeEventHandler }
                                    touched={this.state.questionnireForm.orientation.touched}
                                    valid={this.state.questionnireForm.orientation.valid}  
                                />    

                                <button type="submit" id="contact_form_submit" name="contact_submit" className="theme_button color1">Submit</button>
								<button type="reset" id="contact_form_clear" name="contact_clear" className="theme_button inverse bottommargin_0">Clear</button>
							</form>
						</div>
					</div>
				</div>
			</section>
        );
    }
}

export default Questionnire;