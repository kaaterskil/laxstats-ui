require('./core');

var angular = require('angular');

describe('AuthService', function () {
    'use strict';
    
    var $httpBackend, 
        authService,
        sessionService,
        loginApi = 'http://www.laxstats.net/api/login',
        logoutApi = 'http://www.laxstats.net/logout',
        mockCredentials = {
            username: 'john@example.com',
            password: 'admin'
        },
        mockToken = 'eyJhbGciOiJIUzUxMiJ9',
        mockSuccessResponse = {
            headers: {"X-AUTH-TOKEN": mockToken}
        },
        failureResponse = {
            "timestamp":1442181310379,
            "status":500,
            "error":"Internal Server Error",
            "exception":"org.springframework.security.core.userdetails.UsernameNotFoundException",
            "message":"org.springframework.security.core.userdetails.UsernameNotFoundException: User not found",
            "path":"/api/login"
        };
    
    beforeEach(angular.mock.module('laxstats.core'));
    
    beforeEach(angular.mock.inject(function (_$httpBackend_, SessionService, AuthService) {
        $httpBackend = _$httpBackend_;
        sessionService = SessionService;
        authService = AuthService;
    }));
    
    afterEach(function () {
        sessionService.destroySession();
    });
    
    it('should create an authentication service', function () {
        expect(authService).toBeDefined();
    });
    
    it('should authenticate a known user', function () {
        $httpBackend.expectPOST(loginApi)
            .respond(function (method, url, data, headers) {
                return [200, '', mockSuccessResponse.headers];
            });
        
        authService.authenticate(mockCredentials);
        
        $httpBackend.flush();
        expect(authService.authenticated).toBe(true);
        expect(sessionService.isAuthenticated()).toBe(true);
    });
    
    it('should fail to authenticate an unknown user', function () {
        $httpBackend.expectPOST(loginApi)
            .respond(500, failureResponse, {});
        
        authService.authenticate(mockCredentials);
        
        $httpBackend.flush();
        expect(authService.authenticated).toBe(false);
        expect(sessionService.isAuthenticated()).toBe(false);
    });
    
    it('should log out a user', function () {
        $httpBackend.expectPOST(logoutApi, {}).respond(200);
        
        authService.clear();
        
        $httpBackend.flush();
        expect(authService.authenticated).toBe(false);
        expect(sessionService.isAuthenticated()).toBe(false);
    });
});