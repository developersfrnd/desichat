import React, { Component } from 'react';
import BaseComponent from '../../../Containers/BaseComponent'
import validate from '../Validator'
import TextInput from '../TextInput/TextInput'
import Select from '../../Forms/Select/Select'
import axios from 'axios';
import Constants from '../../../Config/Constants'
import validateOnSubmit from '../ValidateOnSubmit'
import { AppContext } from '../../../Context'
import Messages from '../../../Config/Messages';
import ShowError from '../ShowError';
import Loading from '../../Loaders/Loading';

class PersonalInfo extends BaseComponent {
    static contextType = AppContext;
    constructor() {
        super();
        this.state = {
            formSubmitted: false,
            selectedFile: null,
            formError: null,
            loading: false,
            personalForm: {
                'address': {
                    type: 'input',
                    placeholder: 'Address',
                    value: '',
                    touched: false,
                    valid: false,
                    validationRules: {
                        isRequired: true,
                        minLength: 3
                    }
                },
                'city': {
                    type: 'input',
                    placeholder: 'City',
                    value: '',
                    touched: false,
                    valid: false,
                    validationRules: {
                        isRequired: true,
                        minLength: 3
                    }
                },
                'state': {
                    type: 'input',
                    placeholder: 'State',
                    value: '',
                    touched: false,
                    valid: false,
                    validationRules: {
                        isRequired: true,
                        minLength: 3
                    }
                },
                'country': {
                    value: 'India',
                    options: Constants.countries,
                    touched: true,
                    valid: true,
                    validationRules: {
                        isRequired: true
                    }
                },
                'zipcode': {
                    type: 'input',
                    placeholder: 'Zip Code',
                    value: '',
                    touched: false,
                    valid: false,
                    validationRules: {
                        isRequired: true,
                        minLength: 3
                    }
                },
                'phone': {
                    type: 'input',
                    placeholder: 'Phone Number',
                    value: '',
                    touched: false,
                    valid: false,
                    validationRules: {
                        isRequired: true,
                        minLength: 3
                    }
                },
            }
        }
    }

    componentDidMount() {
        let authUser = { ...this.context.stateData.authUser };
        let pf = { ...this.state.personalForm };
        let obj = {
            ...pf,
            address: { ...pf.address, value: (authUser.address) ? authUser.address : '', touched: (authUser.address) ? true : false, valid: (authUser.address) ? true : false },
            city: { ...pf.city, value: (authUser.city) ? authUser.city : '', touched: (authUser.city) ? true : false, valid: (authUser.city) ? true : false },
            state: { ...pf.state, value: (authUser.state) ? authUser.state : '', touched: (authUser.state) ? true : false, valid: (authUser.state) ? true : false },
            zipcode: { ...pf.zipcode, value: (authUser.zipcode) ? authUser.zipcode : '', touched: (authUser.zipcode) ? true : false, valid: (authUser.zipcode) ? true : false },
            phone: { ...pf.phone, value: (authUser.phone) ? authUser.phone : '', touched: (authUser.phone) ? true : false, valid: (authUser.phone) ? true : false },
        };

        this.setState({ personalForm: obj });
    }

    checkValidation = () => {
        let isFormValid = true;

        let validatorObj = validateOnSubmit(this.state.personalForm);
        isFormValid = validatorObj.isFormValid;
        if (!isFormValid) {
            this.setState({ personalForm: validatorObj.updatedState, formError: validatorObj.message })
        }

        if (isFormValid) {
            isFormValid = (this.state.formError) ? false : true;
        }

        return isFormValid;
    }

    changeEventHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        let updatedStateObject = { ...this.state.personalForm }
        let updatedElementObject = { ...updatedStateObject[name] };

        updatedElementObject.touched = true;
        updatedElementObject.value = value

        let validatorRes = validate(updatedElementObject.value, updatedElementObject.validationRules);
        updatedElementObject.valid = validatorRes.isValid;

        updatedStateObject[name] = updatedElementObject;

        this.setState({
            formError: null,
            personalForm: updatedStateObject
        });
    }

    onChangeFileInputHandler = (event) => {
        this.setState({ formError: null });
        event.target.classList.remove("invalid");

        let file = event.target.files[0];

        if (file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png') {

            this.setState({ formError: Messages.imageFileTypeError })
            event.target.classList.add("invalid");

        } else if (file.size > Constants.maxFileSizeToUpload) {

            this.setState({ formError: Messages.fileSizeError })
            event.target.classList.add("invalid");

        } else {

            this.setState({ selectedFile: event.target.files[0] })
        }
    }

    submitEventHandler = (event) => {
        event.preventDefault();
        if (this.checkValidation()) {
            let formData = new FormData(document.getElementById('personalInfo'));
            formData.append('profile_picture', this.state.selectedFile)

            this.setState({ loading: true })
            axios.post(
                `${Constants.apiEndPoint}users/${this.context.stateData.authUser.id}`,
                formData,
                this.axiosConfig()
            )
                .then(response => {
                    let redirect = '/questionnire'
                    if (this.props.location.search == '?edit=1') {
                        redirect = "/profile"
                    }

                    let updatedAuthUser = {
                        ...this.context.stateData.authUser,
                        address: response.data.data.address,
                        city: response.data.data.city,
                        state: response.data.data.state,
                        country: response.data.data.country,
                        zipcode: response.data.data.zipcode,
                        phone: response.data.data.phone,
                        profilePicture: `${response.data.data.profilePicture}`
                    }
                    this.setContextState({ authUser: updatedAuthUser, redirect: `${redirect}` })
                    this.setState({ formSubmitted: true, loading: false })
                })
                .catch(error => {
                    this.showMessage(error);
                });
        }
    }

    render() {
        return (
            (this.state.loading) ? <Loading /> :
                <section className="ds section_padding_70">
                    {this.pageRedirection()}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
                                <h2 className="big margin_0">Personal Information</h2>
                                <h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Personal Information</h2>

                                <ShowError message={this.state.formError} />

                                <form id="personalInfo" name="personalInfo" className="contact-form" method="post" onSubmit={this.submitEventHandler}>
                                    <input type="hidden" name="_method" value="PUT" />

                                    <Select
                                        newStyles={"myClasses"}
                                        value={this.state.personalForm.country.value}
                                        name="country"
                                        options={this.state.personalForm.country.options}
                                        onChange={this.changeEventHandler}
                                        touched={this.state.personalForm.country.touched}
                                        valid={this.state.personalForm.country.valid}
                                    />

                                    <TextInput name="address"
                                        type="text"
                                        placeholder="Address"
                                        size="160"
                                        onChange={this.changeEventHandler}
                                        requiredField="true"
                                        value={this.state.personalForm.address.value}
                                        touched={this.state.personalForm.address.touched}
                                        valid={this.state.personalForm.address.valid}
                                    />

                                    <TextInput name="city"
                                        type="text"
                                        placeholder="City"
                                        size="120"
                                        onChange={this.changeEventHandler}
                                        requiredField="true"
                                        value={this.state.personalForm.city.value}
                                        touched={this.state.personalForm.city.touched}
                                        valid={this.state.personalForm.city.valid}
                                    />

                                    <TextInput name="state"
                                        type="text"
                                        placeholder="State"
                                        size="120"
                                        onChange={this.changeEventHandler}
                                        requiredField="true"
                                        value={this.state.personalForm.state.value}
                                        touched={this.state.personalForm.state.touched}
                                        valid={this.state.personalForm.state.valid}
                                    />

                                    <TextInput name="zipcode"
                                        type="text"
                                        placeholder="Zip Code"
                                        size="30"
                                        onChange={this.changeEventHandler}
                                        requiredField="true"
                                        value={this.state.personalForm.zipcode.value}
                                        touched={this.state.personalForm.zipcode.touched}
                                        valid={this.state.personalForm.zipcode.valid}
                                    />

                                    <TextInput name="phone"
                                        type="text"
                                        placeholder="Phone Number"
                                        size="30"
                                        onChange={this.changeEventHandler}
                                        requiredField="true"
                                        value={this.state.personalForm.phone.value}
                                        touched={this.state.personalForm.phone.touched}
                                        valid={this.state.personalForm.phone.valid}
                                    />

                                    <div className="form-group col-md-12">
                                        <label htmlFor="profile_picture" className="sr-only">Profile Picture
                                        <span className="required">*</span>
                                        </label>
                                        <input type="file" name="profile_picture" className="form-control" onChange={this.onChangeFileInputHandler} />
                                    </div>

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

export default PersonalInfo;