import React from 'react';
import Aux from '../../../hoc/Aux'

const textInput = (props) => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control text-center invalid';
    }

    let inputField = (
            <input type={props.type} 
                value= { props.value } 
                name={ props.name } 
                className={formControl} 
                placeholder={ props.placeholder } 
                { ...props }
            />
    )

    if(props.type == "textarea"){
        inputField = (
            <textarea 
                value= { props.value } 
                name={ props.name } 
                className={formControl} 
                placeholder={ props.placeholder } 
                { ...props }
            />
        )    
    }
    
     if(props.type == "email"){
        inputField = (
            <Aux>
            <input type={props.type} 
                value= { props.value } 
                name={ props.name } 
                className={formControl} 
                placeholder={ props.placeholder } 
                { ...props }

            />

            <i className="rt-icon2-envelope"></i> 
            </Aux>
        )    
    }
     if(props.type == "password"){
        inputField = (
            <Aux>
            <input type={props.type} 
                value= { props.value } 
                name={ props.name } 
                className={formControl} 
                placeholder={ props.placeholder } 
                { ...props }

            />

            <i className="rt-icon2-lock-closed-outline"></i> 
            </Aux>
        )    
    }
       if(props.type == "text"){
        inputField = (
            <Aux>
            <input type={props.type} 
                value= { props.value } 
                name={ props.name } 
                className={formControl} 
                placeholder={ props.placeholder } 
                { ...props }

            />

            <i className="rt-icon2-pen2"></i> 
            </Aux>
        )    
    }
   

    return (
        <div className="form-group col-md-12">
            {(props.inputtype != "hidden") ? 
                <label htmlFor={ props.name } className="sr-only">Full Name
                    { props.requiredField ? <span className="required">*</span> : null }
                </label> : null
            }

            {inputField}

        </div>
    )
}

export default textInput;