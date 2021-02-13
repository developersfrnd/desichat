import React from 'react';

const ValidationError = (props) => {
    return (
        <span style={{"width":"100%", 'marginTop':".25rem", "fontSize":"80%", "color":"#dc3545"}}>
            {props.message}
        </span>
    )
}

export default ValidationError;