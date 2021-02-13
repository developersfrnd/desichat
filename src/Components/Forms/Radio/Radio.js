import React from 'react';

const Radio = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control checkbox-inline invalid';
    }

    return (
        <div className="form-group">

            {props.options.map(option => (
                <div className="col-md-6" key={option.value}>

                    <label className="radioContainer">{option.displayValue}
                        <input type="radio"
                        name={props.name}
                        value={option.value}
                        onChange={props.onChange}
                        className={formControl}
                        checked= { option.checked }
                        />
                    </label>
                </div>
            ))}

        </div>
    );
}

export default Radio;
