class SessionService {
    constructor() {
        // Noop
    }
    
    /*---------- Pseudo-Private Methods ----------*/
    
    getStoredValue(name){
        return sessionStorage.getItem(name);
    }
    
    setStoredValue(name, newValue){
        let oldValue;
        if(!name) { return undefined; }
        
        oldValue = sessionStorage.getItem(name);
        sessionStorage.setItem(name, newValue);
        return oldValue;
    }
    
    clear(){
        sessionStorage.clear();
    }
    
    /*---------- Public Methods ----------*/
    
    getSecurityToken() {
        return this.getStoredValue('laxstats.token');
    }
    
    setSecurityToken(authToken) {
        if(authToken) {
            this.setStoredValue('laxstats.authenticated', true);
            return this.setStoredValue('laxstats.token', authToken);
        }
        return null;
    }
    
    createSession(data, authToken) {
        if(data) {
            this.setStoredValue('laxstats.authenticated', data.authenticated);
            this.setStoredValue('laxstats.authorities', data.authorities[0].authority);
            this.setStoredValue('laxstats.credentials', data.credentials.password);
            this.setStoredValue('laxstats.username', data.name);
            this.setStoredValue('laxstats.principal', data.principal.name);
            this.setStoredValue('laxstats.sessionId', data.details.sessionId);
            this.setStoredValue('laxstats.token', authToken);
            return true;
            
        }
        return false;
    }
    
    destroySession() {
        this.clear();
    }
    
    getCredentials() {
        return this.getStoredValue('laxstats.credentials');
    }
    
    getUser() {
        return this.getStoredValue('laxstats.principal');
    }
    
    getSessionId() {
        return this.getStoredValue('laxstats.sessionId');
    }
    
    getUsername() {
        return this.getStoredValue('laxstats.username');
    }
    
    getUserRole() {
        if(this.getStoredValue('laxstats.authorities')) {
            return this.getStoredValue('laxstats.authorities');
        }
        return -1;
    }
    
    isAuthenticated() {
        var state = this.getStoredValue('laxstats.authenticated');
        return Boolean(state);
    }
}

export default SessionService;