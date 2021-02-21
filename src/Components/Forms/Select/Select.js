import React from 'react';

const Select = props => {

  let divClass = "form-group select-group col-md-12"
  let formControl = "form-control";

  if (props.touched && !props.valid) {
    formControl = 'form-control orderby invalid';
  }

  if (props.multiple) {
    divClass = 'form-group select-group select-group-multiple col-md-12';
  }

  return (
    <div className={`${divClass} ${props.newStyles}`}>
      <select className={formControl} value={props.value} onChange={props.onChange} name={props.name} {...props}>
        {props.options.map(option => (
          <option value={option.value} key={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
