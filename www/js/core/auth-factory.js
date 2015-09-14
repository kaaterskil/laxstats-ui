import {API, ROUTES} from './routes';

export function authFactory($rootScope, $http, $cookies, $location, $timeout, SessionService,
        ContextResolver) {
    'ngInject';

    var auth = {
        authenticated: false,
        loginPath: ROUTES.main.login,
        logoutPath: ROUTES.main.logout,
        successPath: ROUTES.admin.home,
        homePath: ROUTES.main.home,
        currentPath: ''
    };

    function callback(isAuthenticated, userData, token) {
        if (isAuthenticated) {
            SessionService.createSession(userData, token);
            $location.path(auth.successPath);
        } else {
            SessionService.destroySession();
            $location.path(auth.loginPath);
        }
    }

    function enter() {
        var isAuthenticated = SessionService.isAuthenticated();

        // Match either a single slash or /main/some-page
        if (!isAuthenticated && !$location.path().match(/^(\/|\/main.*)$/)) {
            auth.currentPath = $location.path();
            if (!auth.authenticated) {
                $location.path(auth.loginPath);
            }
        }
    }

    auth.init = function () {
        $rootScope.$on('$stateChangeStart', function () {
            enter();
        });
    };

    auth.authenticate = function(credentials) {
        var api = ContextResolver.baseUrl + API.main.login,
            payload = {
                username: credentials.username,
                password: credentials.password
            };
        
        function authenticationSuccess(response){
            var token = response.headers('X-AUTH-TOKEN'),
                data = {};

            auth.authenticated = false;
            if (token) {
                auth.authenticated = true;
                SessionService.setSecurityToken(token);
                
                data = {
                    authenticated: true,
                    authorities: [{authority: ''}],
                    credentials: credentials,
                    name: credentials.username,
                    principal: {name: credentials.username},
                    details: {sessionId: token}
                };
            }
            callback(auth.authenticated, data, token);
        }
        
        function authenticationFailure(response){
            auth.authenticated = false;
            callback(auth.authenticated);
        }

        $http.post(api, payload)
            .then(authenticationSuccess, authenticationFailure);
    };

    auth.clear = function () {
        var api = ContextResolver.baseUrl + API.main.logout;
        
        function logoutSuccess(){
            auth.authenticated = false;
            SessionService.destroySession();
            $location.path(auth.homePath);
        }
        
        function logoutFailure(response){
            auth.authenticated = false;
            SessionService.destroySession();
        }

        $http.post(api, {}).then(logoutSuccess, logoutFailure);
    };

    return auth;
}
