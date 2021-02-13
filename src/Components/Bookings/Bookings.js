import React, { useState, useEffect } from 'react';
import Sidebar from '../Profile/Sidebar';
import userModel from '../../ApiManager/user'
import bookingModel from '../../ApiManager/BookingModel'
import Loading from '../Loaders/Loading';
import PaginationLinks from '../../Containers/Pagination/PaginationLinks';
import DateTimeManipulate from '../../Config/DateTimeManipulate';
import { Link } from 'react-router-dom';


function Bookings() {

    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)

    useEffect(() => {
        bookingModel.getBookings({params:{page:page}})
        .then((res) => {
            setbookings(res.data);
            setloading(false)
        })
    }, [page])

    const clickPageNumberHandler = (pageNumber) => {
        setpage(pageNumber);
    }
    
    return (
        (loading) ? <Loading /> :
        <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
            <div className="container">
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                        <h3>Booking History</h3>
                        <div className="table-responsive">
                            <table className="table_template darklinks" id="timetable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Credits</th>
                                        <th>Model</th>
                                        <th>Schedule</th>
                                        <th>Booked On</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    (!(bookings.data).length) ? 
                                        <tr>
                                            <td colSpan="6" align="center"> No Bookings Found </td>
                                        </tr>

                                        : 
                                    
                                        bookings.data.map((booking, index) => {
                                            let joinNowLink = (booking.schedule.channelSessionId) ? <Link to={`meeting/${booking.schedule.id}`}>Join Now</Link> : '';
                                            return (
                                                <tr key={booking.id}>
                                                    <th>{index + 1}</th>
                                                    <td>{booking.creditPoints}</td>
                                                    <td>{booking.model.name}</td>
                                                    <td>
                                                        {DateTimeManipulate.timeFormatAMPM(new Date(booking.schedule.fromTime))} - 
                                                        {DateTimeManipulate.timeFormatAMPM(new Date(booking.schedule.toTime))} 
                                                    </td>
                                                    <td>{(booking.createdAt).substr(0, 10)}</td>
                                                    <td>{joinNowLink}</td>
                                                </tr>
                                            )
                                        })    
                                    }
                                </tbody>
                            </table>

                            <PaginationLinks meta={bookings.meta} clickEvent={clickPageNumberHandler} />
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </div>
        </section>
    )
}

export default Bookings
