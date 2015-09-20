let self;

class HttpInterceptorProvider {
    constructor(SessionService) {
        self = this;
        this.SessionService = SessionService;
    }
    
    request(config) {
        var needsToken = config.url.method != 'GET';
        
        if(self.SessionService && needsToken) {
            let authToken = self.SessionService.getSecurityToken();

            if(authToken) {
                config.headers['X-Auth-Token'] = authToken;
            }
        }
        return config;
    }
    
    static factory(SessionService) {
        'ngInject';
        
        return new HttpInterceptorProvider(SessionService);
    }
}

export default HttpInterceptorProvider;