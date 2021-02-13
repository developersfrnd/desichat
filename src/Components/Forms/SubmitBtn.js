import React from 'react'

function SubmitBtn(props) {

    const btnVal = (props.value) ? props.value : 'Save';

    return (
        <button 
            type="submit" 
            className="theme_button color1"
            disabled={props.inprogress}
            > 
            {(props.inprogress) ? 'In Progress...' : btnVal } 
        </button>
    )
}

export default SubmitBtn
