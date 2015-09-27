let self;

class DateInterceptor {
    constructor(DateDescriptor) {
        self = this;
        this.descriptor = DateDescriptor;
    }
    
    response(resp) {
        return self.descriptor.fromString(resp);
    }
}

class DateInterceptorProvider {
    
    $get(DateDescriptor) {
        'ngInject';
        return new DateInterceptor(DateDescriptor);
    }
}

export default DateInterceptorProvider;