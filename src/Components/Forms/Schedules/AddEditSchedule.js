import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../../Profile/Sidebar'
import { useForm } from 'react-hook-form';
import Messages from '../../../Config/Messages';
import DCDateTimePicker from '../../Shared/DateTimePicker';
import ValidationError from '../ValidationError';
import scheduleModel from '../../../ApiManager/scheduleModel'
import { toast } from 'react-toastify';
import Schedules from '../../Schedules/Schedules';

function AddEditSchedule() {

    const { register, handleSubmit, errors, reset } = useForm();
    const [fromDate, setfromDate] = useState(new Date());
    const [toDate, settoDate] = useState('');
    const [validationError, setvalidationError] = useState('')
    const [inProgress, setinProgress] = useState(false)
    const [lastScheduleId, setlastScheduleId] = useState(0)
    
    const onSubmit = (data) => {
        data['fromTime'] = fromDate;
        data['toTime'] = toDate;

        (toDate <= fromDate) ? setvalidationError(Messages.timeComparision) : 
        scheduleModel.postSchedule(data)
        .then((res) => {
            toast.success(Messages.successMessage);
            setlastScheduleId(res.data.data.id)
            reset()
        })
        .catch((error) => {
            toast.error(error.message);
        })
    }

    const setFromDateHandler = (value) => {
        setfromDate(value)
    }
    const setToDateHandler = (value) => {
        settoDate(value)
    }

    return (
        <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                            <h3>Manage Schedules</h3><br />
                            <form className="contact-form" method="post" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    Avalaible Form  &nbsp; &nbsp;
                                    <DCDateTimePicker 
                                        required={true} 
                                        minDate={new Date()}
                                        onChange={setFromDateHandler} 
                                        value={fromDate} 
                                    /> 
                                    
                                    &nbsp; &nbsp; &nbsp;
                                    To  &nbsp; &nbsp;
                                    <DCDateTimePicker 
                                        ref={register} 
                                        required={true} 
                                        minDate={new Date()} 
                                        onChange={setToDateHandler}
                                        value={toDate}
                                    />
                                    <br />
                                    <ValidationError message={validationError} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="creditPointsPerMinute" className="sr-only"> Name
                                        <span className="required">*</span>
                                    </label>    
                                    <input 
                                        type="number" 
                                        name="creditPointsPerMinute" 
                                        className="form-control" 
                                        placeholder="Credit Points / Minute"
                                        ref={register({required:{value:true,message:Messages.isRequired}})}  
                                    />
                                    {errors.creditPointsPerMinute && <ValidationError message={errors.creditPointsPerMinute.message} />}
                                </div>

                                <button 
                                    type="submit" 
                                    name="contact_submit" 
                                    className="theme_button color1"
                                    >Submit
                                </button>
							</form>
                            <Schedules formSubmited={lastScheduleId} />
                        </div>
                    <Sidebar  />
                </div>
            </div>
        </section>
    )
}

export default AddEditSchedule
