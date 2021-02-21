import React, { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import usersModel from '../../../ApiManager/user'
import Loading from '../../Loaders/Loading';
import Sidebar from '../../Profile/Sidebar';
import DCDateTimePicker from '../../Shared/DateTimePicker';
import Constants from '../../../Config/Constants';
import { toast } from 'react-toastify';
import { AppContext } from '../../../Context';
import Aux from '../../../hoc/Aux';
import ValidationError from '../ValidationError';
import SubmitBtn from '../SubmitBtn';

function ProfileEdit() {

    const { register, handleSubmit, errors, watch } = useForm();

    const [loggedInUser, setloggedInUser] = useState('');
    const [loading, setloading] = useState(true);
    const [dob, setdob] = useState('');
    const isPasswordChange = watch('changePassword');
    const passwordVal = watch('password')
    const [inprogress, setinprogress] = useState(false)

    const adultAge = new Date(new Date().setFullYear(new Date().getFullYear() - Constants.adultAge));

    useEffect(() => {
        usersModel.getAuthUser()
            .then(res => {
                setloggedInUser(res.data.data);
                setdob(new Date(res.data.data.dob))
                setloading(false);
            })
            .catch(error => {
                toast.error(error.message);
            })
    }, [])

    const onSubmit = (data) => {
        setinprogress(true);
        data['dob'] = dob;
        usersModel.updateUser(data)
            .then((res) => {
                setinprogress(false);
                toast.success(Messages.successMessage);
            })
            .catch(error => {
                setinprogress(false);
                toast.error(error.message)
            })
    };


    return (
        (loading) ? <Loading /> :
            <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                            <h3>Edit Profile</h3>
                            <form className="contact-form" method="post" onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" name="_method" value="PUT" ref={register} />
                                <input type="hidden" name="id" value={loggedInUser.id} ref={register} />
                                <div className="form-group col-md-12">
                                    <label htmlFor="name" className="sr-only"> Name
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={loggedInUser.name}
                                        name="name"
                                        className="form-control"
                                        ref={register({ required: { value: true, message: Messages.isRequired } })}
                                    />
                                    {errors.name && <ValidationError message={errors.name.message} />}
                                </div>

                                <div className="form-group col-md-12 invalid" id="dayPickerContainer">
                                    <DCDateTimePicker
                                        required={true}
                                        onChange={setdob}
                                        value={dob}
                                        format="yyyy-MM-dd"
                                        disableClock={true}
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="col-md-6">
                                        <label className="radioContainer"> Male
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={Constants.gender.male}
                                                className="form-control"
                                                defaultChecked={(loggedInUser.gender) ? true : false}
                                                ref={register}
                                            />
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="radioContainer"> FeMale
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={Constants.gender.female}
                                                className="form-control"
                                                defaultChecked={(!loggedInUser.gender) ? true : false}
                                                ref={register}
                                            />
                                        </label>
                                    </div>
                                    {errors.gender && errors.message}
                                </div>

                                <div className="form-group col-md-12">
                                    <label className="radioContainer2">
                                        <input type="checkbox"
                                            name="changePassword"
                                            ref={register}
                                        />
                                    </label>
                                    I want to change my password pass
                                </div>

                                {isPasswordChange && (
                                    <Aux>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="password" className="sr-only">Password
                                                <span className="required">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                className="form-control"
                                                ref={register({ required: { value: true, message: Messages.isRequired }, minLength: { value: Constants.minPasswordLength, message: Messages.minLength } })}
                                            />
                                            {errors.password && <ValidationError message={errors.password.message} />}
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="password_confirmation" className="sr-only">Confirm Password
                                                <span className="required">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                name="password_confirmation"
                                                className="form-control"
                                                ref={register({
                                                    validate: value => value == passwordVal,
                                                })}
                                            />
                                            {errors.password_confirmation && <ValidationError message={Messages.passwordConfirm} />}
                                        </div>
                                    </Aux>
                                )}
                                <SubmitBtn inprogress={inprogress} />
                            </form>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </section>
    )
}

export default ProfileEdit
