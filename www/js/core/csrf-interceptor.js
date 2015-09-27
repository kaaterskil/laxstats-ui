let self;

class CsrfInterceptor {
    constructor($cookies) {
        self = this;
        this.$cookies = $cookies;
        this.headerName = 'X-XSRF-TOKEN';
        this.cookieName = 'XSRF-TOKEN';
        this.allowedMethods = ['GET'];
    }
    
    setHeaderName(headerName) {
        this.headerName = headerName;
    }
    
    setCookieName(cookieName) {
        this.cookieName = cookieName;
    }
    
    setAllowedMethods(allowedMethods) {
        if(!Array.isArray(allowedMethods)) {
            allowedMethods = [allowedMethods];
        }
        this.allowedMethods = allowedMethods;
    }
    
    request(config) {
        if(self.allowedMethods.indexOf(config.method) !== -1) {
            config.headers[self.headerName] = self.$cookies[self.cookieName];
        }
        return config;
    }
}

class CsrfInterceptorProvider {
    
    $get($cookies) {
        'ngInject';
        return new CsrfInterceptor($cookies);
    }
}

export default CsrfInterceptorProvider;