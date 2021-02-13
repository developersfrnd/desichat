import React from 'react'
import Aux from '../../hoc/Aux';

const ShowError = (props) => {
    let errSpan = (props.message) ? <span className="contact-form-respond highlight">{props.message}</span> : null;
    return (
        <Aux>
            {errSpan}
        </Aux>
    )
}

export default ShowError
