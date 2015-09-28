const REGEX_LOCAL_DATE = /AsLocal[Date|DateTime|Time]/;

class DateInterceptor {
    constructor() {}
    
    request(config) {
        if(config.data) {
            for(let prop in config.data) {
                if(config.data.hasOwnProperty(prop)) {
                    // Null any local date, local datetime and localtime properties
                    if (prop.match(REGEX_LOCAL_DATE)) {
                        config.data[prop] = null;
                    }
                }
            }
        }
        return config;
    }
}

class DateInterceptorProvider {
    $get() {
        return new DateInterceptor();
    }
}

export default DateInterceptorProvider;