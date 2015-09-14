export default class CsrfProvider {
    constructor() {
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
    
    $get($cookies) {
        'ngInject';
        return {
            request: (config) => {
                if(this.allowedMethods.indeOf(config.method) !== -1) {
                    config.headers[this.headerName] = $cookies[this.cookieName];
                }
                return config;
            }
        };
    }
    
    static factory() {
        return new CsrfProvider();
    }
}