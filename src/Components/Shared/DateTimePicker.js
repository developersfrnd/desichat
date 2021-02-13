import React, { useState, useEffect } from 'react'
import DateTimePicker from 'react-datetime-picker';

function DCDateTimePicker(props) {

    const format = (props.format) ? (props.format) : "yyyy-MM-dd hh:mm a";
    return (
        <DateTimePicker
          calendarIcon={<span className="rt-icon2-calendar2" />}
          clearIcon={<span className="rt-icon2-cancel2" />}
          format={format}
          {...props}
        />
    )
}

export default DCDateTimePicker
