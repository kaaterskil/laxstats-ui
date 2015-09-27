import { REGEX_ISO8601, MOMENT_DATE_FORMAT } from './constants';

var moment = require('moment'), self;

class DateDescriptor {
    constructor(){
        self = this;
    }
    
    fromString(input){
        let value, match, parsedValue;
        
        if (typeof input !== 'object') {
            return input;
        }
        
        for (let key in input) {
            if (!input.hasOwnProperty(key)) {
                continue;
            }

            value = input[key];
            if (typeof value === 'string' && (match = value.match(REGEX_ISO8601))) {
                parsedValue = moment(value);
                if (parsedValue.isValid()) {
                    input[key] = parsedValue.toDate();
                }
            } else if (typeof value === 'object') {
                self.fromString(value);
            }
        }
        return input;
    }
    
    toString(date){
        let wrappedDate = moment(date);
        
        return wrappedDate.format(MOMENT_DATE_FORMAT);
    }
}

export default DateDescriptor;