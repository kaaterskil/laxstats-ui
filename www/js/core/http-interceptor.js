let self;

class HttpInterceptor {
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
}

class HttpInterceptorProvider {
    
    $get(SessionService) {
        'ngInject';
        return new HttpInterceptor(SessionService);
    }
}

export default HttpInterceptorProvider;