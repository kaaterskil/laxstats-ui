import { REGEX_ISO8601, MOMENT_DATE_FORMAT } from './constants';

var moment = require('moment');

class DateDescriptor {
    constructor(){}
    
    parseObject(obj){
        if(typeof obj !== 'object') {
            return obj;
        }
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                let val = obj[prop];
                obj[prop] = this._parseInput(val);
            }
        }
        return obj;
    }
    
    fromString(str){
        return this._parseInput(str);
    }
    
    toString(date){
        var wrapped = moment(date);
        return wrapped.format(MOMENT_DATE_FORMAT);
    }
    
    _parseInput(input){
        let match;
        if (typeof input === 'string' && (match = input.match(REGEX_ISO8601))) {
            let wrapped = moment(match[0]);
            if(wrapped.isValid()) {
                return wrapped.toDate();
            }
        } else if (typeof input === 'object') {
            return this.parseObject(input);
        }
        return input;
    }
}

class DateDescriptorProvider {
    $get() {
        return new DateDescriptor();
    }
}

export default DateDescriptorProvider;