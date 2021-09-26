import React, { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import usersModel from '../../../ApiManager/user'
import Loading from '../../Loaders/Loading';
import Sidebar from '../../Profile/Sidebar';
import { toast } from 'react-toastify';
import ValidationError from '../ValidationError';
import SubmitBtn from '../SubmitBtn';
import authModel from '../../../ApiManager/auth';

function AccountCharges() {

    const { register, handleSubmit, errors, watch } = useForm();

    const [loading, setloading] = useState(true);
    const [inprogress, setinprogress] = useState(false)
    const [authUser, setauthUser] = useState('')
    const [accountInfo, setaccountInfo] = useState({});
    

    useEffect(() => {
        setloading(true);
        usersModel.getAccountInfo()
        .then(user => {
            setaccountInfo(user.data.data); 
        })
        .catch(error => {
            toast.error(error.message);
        })

        setloading(false);

    }, [])

    const onSubmit = (data) => {
        setinprogress(true);
        usersModel.addUpdateAccount(data)
            .then((res) => {
                let userObj = authModel.getAuthUserObj();
                authModel.setAuthToken({...userObj,charges:res.data.data.charge_per_minute});
                setinprogress(false);
                toast.success(Messages.successMessage);
            })
            .catch(error => {
                setinprogress(false);
                toast.error(error.message)
            })
    };


    return (
            <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                            <h3>Bank Account Info & Charges</h3>
                            {(loading) ? <Loading /> :
                            <form className="contact-form" method="post" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group col-md-12">
                                    <label htmlFor="name" className="sr-only"> Charge / Min
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={accountInfo.charge_per_minute}
                                        name="charge_per_minute"
                                        className="form-control"
                                        placeholder="Charge / Min"
                                        ref={register({ required: { value: true, message: Messages.isRequired }, pattern: { value:/^\d+(\.\d{1,2})?$/ , message: Messages.isNumber }})}
                                    />
                                    {errors.charge_per_minute && <ValidationError message={errors.charge_per_minute.message} />}
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="name" className="sr-only"> Account Holder Name
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={accountInfo.account_name}
                                        name="account_name"
                                        className="form-control"
                                        placeholder="Account Holder Name"
                                        ref={register({ required: { value: true, message: Messages.isRequired }})}
                                    />
                                    {errors.charge_per_minute && <ValidationError message={errors.charge_per_minute.message} />}
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="name" className="sr-only"> Bank Name
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={accountInfo.bank_name}
                                        name="bank_name"
                                        className="form-control"
                                        placeholder="Bank Name"
                                        ref={register({ required: { value: true, message: Messages.isRequired }})}
                                    />
                                    {errors.charge_per_minute && <ValidationError message={errors.bank_name.message} />}
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="name" className="sr-only"> Account Number
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={accountInfo.account_number}
                                        name="account_number"
                                        className="form-control"
                                        placeholder="Account Number"
                                        ref={register({ required: { value: true, message: Messages.isRequired }})}
                                    />
                                    {errors.charge_per_minute && <ValidationError message={errors.account_number.message} />}
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="name" className="sr-only"> IFSC Code
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={accountInfo.ifsc_code}
                                        name="ifsc_code"
                                        className="form-control"
                                        placeholder="IFSC Code"
                                        ref={register({ required: { value: true, message: Messages.isRequired }})}
                                    />
                                    {errors.charge_per_minute && <ValidationError message={errors.ifsc_code.message} />}
                                </div>
                                
                                <SubmitBtn inprogress={inprogress} />
                            </form>

                            }
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </section>
    )
}

export default AccountCharges
