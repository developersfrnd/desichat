import React, { useState, useEffect } from 'react'
import { uniqueId } from 'lodash';

function CheckBox(props) {

    const [id, setid] = useState(uniqueId)
    const [isChecked, setisChecked] = useState(props.initialChecked)

    useEffect(() => {
        setisChecked(isChecked)
    }, [isChecked])

    const onChange = (event) => {
        let isChecked = event.currentTarget.checked;
        setisChecked(isChecked);
    }

    return (
        <div>
            <label htmlFor={id}>
            {props.label}
            </label>
        <input
          type="checkbox"
          checked={isChecked}
          id={id}
          onChange={onChange}
        />
      </div>
    )
}

export default CheckBox
