class ErrorService {
    
    /**
     * Processes form validation errors.  
     * 
     * @param data  The response.data object containing an array of error 
     *      objects. Each object has a field and a message property.
     * @returns A hash whose keys correspond to the form fields that failed 
     *      validation. Each key value is an array of error messages.
     */
    processFormErrors(data) {
        var errors = [],
            messages = {};
        
        if(data.fieldErrors) {
            errors = data.fieldErrors;
        } else {
            errors = Array.isArray(data) ? data : [];
        }
        
        errors.forEach(error => {
            if(!messages[error.field]) {
                messages[error.field] = [];
            }
            messages[error.field].push(error.message);
        });
        return messages;
    }
}

export default ErrorService;