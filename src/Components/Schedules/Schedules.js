import React, { useState, useEffect } from 'react';
import scheduleModel from '../../ApiManager/scheduleModel'
import Loading from '../Loaders/Loading';
import PaginationLinks from '../../Containers/Pagination/PaginationLinks';
import aux from '../../hoc/Aux';
import { Link } from 'react-router-dom';

function Schedules(props) {

    const [schedules, setschedules] = useState([]);
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)

    useEffect(() => {
        scheduleModel.getSchedules({params:{page:page}})
        .then((res) => {
            setschedules(res.data);
            setloading(false)
        })
    }, [page,props.formSubmited])

    const clickPageNumberHandler = (pageNumber) => {
        setpage(pageNumber);
    }
    
    const deleteEventHandler = () => {
        console.log("deleted")
    }

    return (
        (loading) ? <Loading /> :
                <aux>
                    <table className="table_template darklinks" id="timetable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>From Time</th>
                                <th>To Time</th>
                                <th>Credit Points / Minute</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            (!(schedules.data).length) ? 
                                <tr>
                                    <td colSpan="5" align="center"> No Schedule Found </td>
                                </tr>

                                : 
                            
                                schedules.data.map((schedule, index) => {
                                    return (
                                        <tr key={schedule.id}>
                                            <th>{index + 1}</th>
                                            <td>{schedule.fromTime}</td>
                                            <td>{schedule.toTime}</td>
                                            <td>{schedule.creditPointsPerMinute}</td>
                                            <td>
                                                {
                                                    !(schedule.bookings_count) ? 
                                                    <button 
                                                        className="theme_button small_button color1"
                                                        onClick={deleteEventHandler}
                                                        >Delete
                                                    </button> 
                                                    : <button 
                                                        className="theme_button small_button color2"
                                                        onClick={deleteEventHandler}
                                                        >Publish
                                                    </button>
                                                } 
                                            </td>
                                        </tr>
                                    )
                                })    
                            }
                        </tbody>
                    </table>

                    <PaginationLinks meta={schedules.meta} clickEvent={clickPageNumberHandler} />
                    </aux>
            
    )
}

export default Schedules
