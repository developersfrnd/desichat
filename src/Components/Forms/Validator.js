import Messages from '../../Config/Messages'

const validate = (value, rules) => {
    let isValid = true;
    let res = {isValid:isValid, breakOnRule:null, message:null};
    
    
    for (let rule in rules) {
    
      switch (rule) {
            case 'minLength': 
                isValid = isValid && minLengthValidator(value, rules[rule]); 
                res = {...res, isValid:isValid, breakOnRule:'minLength', message:Messages.minLength} 
                if(!isValid){
                    return res;
                }
                break;    
            case 'isRequired': 
                isValid = isValid && requiredValidator(value);
                res = {...res, isValid:isValid, breakOnRule:'isRequired', message:Messages.isRequired}
                if(!isValid){
                    return res
                }
                break;        
            case 'isEmail': 
                isValid = isValid && emailValidator(value); 
                res = {...res, isValid:isValid, breakOnRule:'isEmail', message:Messages.isEmail}
                if(!isValid){
                    return res
                }
                break;    
            case 'isNumber': 
                isValid = isValid && numberValidator(value);
                res = {...res, isValid:isValid, breakOnRule:'isNumber', message:Messages.isNumber}
                if(!isValid){    
                    return res
                }
                break;        
            case 'isTime': 
                isValid = isValid && timeValidator(value);
                res = {...res, isValid:isValid, breakOnRule:'isTime', message:Messages.isTime}
                if(!isValid){
                    return res
                }
                break;    
            case 'isDate': 
                isValid = isValid && dateValidator(value);
                res = {...res, isValid:isValid, breakOnRule:'isDate', message:Messages.isDate}
                if(!isValid){
                    return res
                }
                break;        
            default: 
                return res = {...res, isValid:isValid, breakOnRule:null, message:null};
      }
  
    }

    return res;
}
  
  
  /**
   * minLength Val
   * @param  value 
   * @param  minLength
   * @return          
   */
  const minLengthValidator = (value, minLength) => {
      return value.length >= minLength;
  }
  
  /**
   * Check to confirm that feild is required
   * 
   * @param  value 
   * @return       
   */
  const requiredValidator = value => {
      if(Array.isArray(value)){
        return value.length > 0;
      }else if(typeof(value) === 'object'){
        if(value.constructor === Object){
            return Object.keys(value).length === 0;
        }
        if(value.constructor === Date){
            return value.toString !== '';
        }  
      }
      else{
        return value !== '';	
      }
  }
  
  /**
   * Email validation
   * 
   * @param value
   * @return 
   */
  const emailValidator = value => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
  }

  /**
   * Number validation
   * 
   * @param value
   * @return 
   */
  const numberValidator = value => {
    var re = /^\d+(\.\d{1,2})?$/;
    return re.test(value);
  }

  /**
   * Duration validation
   * 
   * @param value
   * @return 
   */
  const timeValidator = value => {
    var re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return re.test(value);
  }

  const dateValidator = value => {
    return !isNaN(Date.parse(value));
    //var re = /^\d{4}([.//])\d{2}\1\d{2}$/;
    //return re.test(value);
  }
  
  
  
  export default validate;