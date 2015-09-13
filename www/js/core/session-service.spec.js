require('./core');

var angular = require('angular');

describe('SessionService', function () {
    'use strict';
    
    var sessionService,
        email = 'john@example.com',
        password = '123',
        mockToken = 'foo',
        mockAuth = {
            "authenticated": true,
            "authorities": [{"authority": "user"}, {"authority": "admin"}],
            "credentials": {"username": email, "password": password},
            "name": email,
            "principal": {"name": email},
            "details": {"sessionId": mockToken},
            "token": mockToken
    };
    
    beforeEach(angular.mock.module('laxstats.core'));
    beforeEach(angular.mock.inject(function (SessionService) {
        sessionService = SessionService;
    }));
    
    it('should clear a session', function () {
        sessionService.clear();
    });
    
    it('should create a session', function () {
        var result = sessionService.createSession(mockAuth, mockToken);
        expect(result).toBe(true);
    });
    
    describe('session actions', function () {
        beforeEach(function () {
            sessionService.clear();
            sessionService.createSession(mockAuth, mockToken);
        });
        
        it('should show the user authentication state', function () {
            var authState = sessionService.isAuthenticated();
            expect(authState).toBe(true);
            
            sessionService.clear();
            authState = sessionService.isAuthenticated();
            expect(authState).toBe(false);
        });
        
        it('should return the username ', function () {
            var username = sessionService.getUsername();
            expect(username).toEqual(email);
        });
        
        it('should return the session id', function () {
            var sessionId = sessionService.getSessionId();
            expect(sessionId).toBe(mockToken);
        });
        
        it('should return the user role', function () {
            var role = sessionService.getUserRole();
            expect(role).toEqual('user');
        });
        
        it('should return the principal', function () {
            var principal = sessionService.getUser();
            expect(principal).toEqual(email);
        });
        
        it('should return the user credentials', function () {
            var credentials = sessionService.getCredentials();
            expect(credentials).toEqual(password);
        });
        
        it('should destroy a session', function () {
            expect(sessionService.isAuthenticated()).toBe(true);
            sessionService.destroySession();
            expect(sessionService.isAuthenticated()).toBe(false);
        });
    });
});