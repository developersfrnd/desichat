import React, { useState, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import scheduleModel from '../../../ApiManager/scheduleModel'
import usersModel from '../../../ApiManager/user'
import DCDateTimePicker from '../../Shared/DateTimePicker'
import SubmitBtn from '../SubmitBtn'
import Messages from '../../../Config/Messages'
import { toast } from 'react-toastify'
import DateTimeManipulate from '../../../Config/DateTimeManipulate'
import ValidationError from '../ValidationError'
import { AppContext } from '../../../Context'
import bookingModel from '../../../ApiManager/BookingModel'

function Booking() {

    const isUserLogin = (usersModel.authToken()) ? true : false
    const { register, handleSubmit ,errors, reset } = useForm();

    const [dob, setdob] = useState('');
    const [slotOptions, setslotOptions] = useState([])
    const [creditPointsRequired, setcreditPointsRequired] = useState(0)
    const [inprogress, setinprogress] = useState(false)
    const { userId } = useParams()
    const authUserContext = useContext(AppContext)

    const submitEventHandler = async (data) => {

        let loggedinUserData = await usersModel.getAuthUser();
        let loggedinUser = loggedinUserData.data.data;
        if(loggedinUser.creditPoints < creditPointsRequired){
            toast.error("you don't have enough credit points for booking.")

        }else{
            
            data['model_id'] = userId;
            data['creditPoints'] = creditPointsRequired;
            bookingModel.postBooking(data)
                .then((res) => {
                    toast.success(Messages.bookingSuccess);
                    reset()
                })
                .catch(error => toast.error(error.message));
        }
    }

    const slotChangeEventHandler = (event) => {
        let val = event.target.value;

        let slot = (slotOptions.filter(slot => slot.id == val))[0];
        let creditPointsNeededToBook = (slot.creditPointsPerMinute) * (DateTimeManipulate.diffDateTime(new Date(slot.fromTime),new Date(slot.toTime)))
        setcreditPointsRequired(creditPointsNeededToBook)
        console.log(authUserContext);
    }

    const datePickerChangeEventHandler = (val) => {
        setdob(val)
        
        setinprogress(true);

        let selectedDate = new Date(val);   
        let month = (selectedDate.getMonth()) + 1;
        let monthVal = (month < 10) ? `0${month}` : month;
        
        scheduleModel.getSchedules({params:{
             model_id: userId,
             fromDate: `${selectedDate.getFullYear()}-${monthVal}-${selectedDate.getDate()}`
            } 
        })
        .then((res) => {
            setslotOptions(res.data.data);
            setinprogress(false);
            if(!(res.data.data).length){ toast.info('No Slots Avalaible For Selected Date.') }
        })
        .catch(error => toast.error(error))
        
    }

    return (
        (!isUserLogin) ? 
            <div className="widget filters isotope_filters">
                <Link to="/login" className="selected"><i className="rt-icon2-calendar2" />&nbsp;&nbsp; Book a Date </Link>
            </div> 
            
            : 
            <div className="widget">
                <h3>Booking</h3>
                {
                    (creditPointsRequired) ? <div className="alert alert-info" style={{padding:'10px'}}>You must have {creditPointsRequired} credits</div> : ''
                }
                
                <form className="contact-form" method="post" onSubmit={handleSubmit(submitEventHandler)}>
                    
                        <label htmlFor="name">Date
                            <span className="required">*</span>
                        </label>&nbsp;&nbsp;
                        <DCDateTimePicker 
                            required={true} 
                            onChange={datePickerChangeEventHandler} 
                            value={dob}
                            format="yyyy-MM-dd"
                            disableClock={true}
                            minDate={new Date()}
                        />
                    
                    <br /><br />
                    <p className="contact-form-phone">
                        <label htmlFor="phone">Avalaible Slots
                            <span className="required">*</span>
                        </label>
                        <select name="schedule_id" onChange={slotChangeEventHandler} className="form-control" ref={register({required:{value:true,message:Messages.isRequired}})}>
                            <option value=''> Select Slot </option>
                            {slotOptions.map((slot) => {

                                let fromTime =  DateTimeManipulate.timeFormatAMPM(new Date(slot.fromTime))
                                let toTime = DateTimeManipulate.timeFormatAMPM(new Date(slot.toTime))

                                return <option value={slot.id} key={slot.id}> {(fromTime)} -  {toTime} </option>

                            })}
                        </select>
                        {errors.schedule_id && <ValidationError message={errors.schedule_id.message} />}
                    </p>
                    <div className="topmargin_30">
                        <SubmitBtn inprogress={inprogress} value="Book a Date" />
                    </div>
                </form>
            </div>
        
    )
}

export default Booking
