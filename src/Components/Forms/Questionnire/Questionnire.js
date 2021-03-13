import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import SubmitBtn from '../SubmitBtn';
import ValidationError from '../ValidationError';
import usersModel from '../../../ApiManager/user';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Constants from '../../../Config/Constants'
import { getCategories } from '../../../ApiManager/categories'
import { getEthnicities } from '../../../ApiManager/ethnicities'
import { getLanguages } from '../../../ApiManager/languages'
import Loading from '../../Loaders/Loading';


function Questionnire() {

    const { register, errors, handleSubmit } = useForm();
    const [inprogress, setinprogress] = useState(false);
    const [loading, setloading] = useState(false)
    const [categories, setcategories] = useState([]);
    const [languages, setlanguages] = useState([]);
    const [ethnicity, setethnicity] = useState([]);
    const [body, setbody] = useState(Constants.body);
    const [weight, setweight] = useState(Constants.weight())
    const [height, setheight] = useState(Constants.height());
    const [hairLength, sethairLength] = useState(Constants.hairLength);
    const [hairColor, sethairColor] = useState(Constants.hairColor);
    const [eyeColor, seteyeColor] = useState(Constants.eyeColor);
    const [orientation, setorientation] = useState(Constants.orientation);
    const [authUser, setauthUser] = useState('')
    const history = useHistory();


    useEffect(() => {
        setloading(true);
        getCategories().then(categoryArr => {
            setcategories(categoryArr.data.data);
        });

        getEthnicities().then(ethnicitiesArr => {
            setethnicity(ethnicitiesArr.data.data);
        })

        getLanguages().then(languagesArr => {
            setlanguages(languagesArr.data.data);
        })

        usersModel.getAuthUser()
        .then(user => {
            setauthUser(user.data.data); 
            setloading(false);
        })
        
    }, [])

    const submitEventHandler = (data) => {
        
        let qryString = window.location.search;
        setinprogress(true);

        let formData = new FormData(document.getElementById('questionnireForm'));
        formData.id = authUser.id;
        
        usersModel.updateUser(formData)
        .then(res => {
            //setinprogress(false);
            history.push('/profile')
        })
        .catch(error => toast.error(error));

        setinprogress(false);
    }

    return (
        <section className="ds section_padding_70">
                <div className="container">
					<div className="row">
						<div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 text-center">
							<h2 className="big margin_0">Questionnire</h2>
							<h2 className="muellerhoff topmargin_5 bottommargin_50 highlight">Questionnire Form</h2>
                            {(loading) ? <Loading />  : 
                                <form id="questionnireForm" className="contact-form" method="post" onSubmit={ handleSubmit(submitEventHandler) }>
                                    <input type="hidden" name="_method" value="PUT" ref={register} />
                                    <div className="form-group select-group select-group-multiple col-md-12">
                                        <select className="form-control" name="categories" multiple ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            <option value="" key="">Select Categories</option>
                                            {categories.map((option) => (
                                                <option value={option.id} key={option.id}  selected={(authUser.categoriesArr.indexOf(option.id) > -1) ? 'selected' : ''}>
                                                    {option.name}
                                                </option>
                                            ))} 
                                        </select>
                                        {errors.categories && <ValidationError message={errors.categories.message} />}
                                    </div>

                                    <div className="form-group select-group col-md-12">
                                        <select className="form-control" name="ethnicity" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            <option value="" key="">Select Ethnicity</option>
                                            {ethnicity.map((option) => (
                                                <option value={option.id} key={option.id} selected={(authUser.ethnicityResource && authUser.ethnicityResource.id == option.id) ? 'selected' : ''}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.ethnicity && <ValidationError message={errors.ethnicity.message} />}
                                    </div>

                                    <div className="form-group select-group select-group-multiple col-md-12">
                                        <select className="form-control" name="languages" multiple ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            <option value="" key="">Languages</option>
                                            {languages.map((option) => (
                                                <option value={option.id} key={option.id} selected={(authUser.languagesArr.indexOf(option.id) > -1) ? 'selected' : ''}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.languages && <ValidationError message={errors.languages.message} />}
                                    </div>

                                    <div className="form-group select-group col-md-12">
                                        <select className="form-control" name="body" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            {body.map((option) => (
                                                <option value={option.value} key={option.value} selected={(authUser.body == option.value) ? 'selected' : ''}>
                                                    {option.displayValue}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.body && <ValidationError message={errors.body.message} />}
                                    </div>

                                    <div className="form-group select-group col-md-12">
                                        <select className="form-control" name="weight" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            {weight.map((option,key) => (
                                                <option value={option.value} key={option.value} selected={(authUser.weight == option.value) ? 'selected' : ''}>
                                                    {option.displayValue}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.weight && <ValidationError message={errors.weight.message} />}
                                    </div>

                                    <div className="form-group select-group col-md-12">
                                        <select className="form-control" name="height" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            {height.map((option,key) => (
                                                <option value={option.value} key={option.value} selected={(authUser.height == option.value) ? 'selected' : ''}>
                                                    {option.displayValue}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.height && <ValidationError message={errors.height.message} />}
                                    </div>

                                    <div className="form-group select-group col-md-12">
                                        <select className="form-control" name="hairLength" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            {hairLength.map((option,key) => (
                                                <option value={option.value} key={option.value} selected={(authUser.hairLength == option.value) ? 'selected' : ''}>
                                                    {option.displayValue}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.hairLength && <ValidationError message={errors.hairLength.message} />}
                                    </div>

                                    <div className="form-group select-group col-md-12">
                                        <select className="form-control" name="hairColor" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            {hairColor.map((option,key) => (
                                                <option value={option.value} key={option.value} selected={(authUser.hairColor == option.value) ? 'selected' : ''}>
                                                    {option.displayValue}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.hairColor && <ValidationError message={errors.hairColor.message} />}
                                    </div>

                                    <div className="form-group select-group col-md-12">
                                        <select className="form-control" name="eyeColor" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            {eyeColor.map((option,key) => (
                                                <option value={option.value} key={option.value} selected={(authUser.eyeColor == option.value) ? 'selected' : ''}>
                                                    {option.displayValue}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.eyeColor && <ValidationError message={errors.eyeColor.message} />}
                                    </div>

                                    <div className="form-group select-group col-md-12">
                                        <select className="form-control" name="orientation" ref={register({required:{value:true,message:Messages.isRequired}})}>
                                            {orientation.map((option,key) => (
                                                <option value={option.value} key={option.value} selected={(authUser.orientation == option.value) ? 'selected' : ''}>
                                                    {option.displayValue}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.orientation && <ValidationError message={errors.orientation.message} />}
                                    </div>
                                    <SubmitBtn inprogress={inprogress} value="Submit" />  
                                </form>    
                            }                
                        </div>
					</div>
				</div>
		</section>    
    )
}

export default Questionnire