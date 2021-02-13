import validate from '../Forms/Validator'

const validateOnSubmit = (formStateObject) => {

    let isFormValid = true;
    let validatorObject = {};
    let updatedStateObject = { ...formStateObject }

    for(let field in formStateObject){
        
        validatorObject = validate(formStateObject[field].value, formStateObject[field].validationRules);
        if(!validatorObject.isValid){
            
            isFormValid = false

            let updatedElementObject = { ...formStateObject[field], touched:true, valid:false};
            
            updatedStateObject[field] = updatedElementObject;
            
            break;
        }
    }

    return {isFormValid:isFormValid, updatedState:updatedStateObject, ...validatorObject}
}

export default validateOnSubmit;