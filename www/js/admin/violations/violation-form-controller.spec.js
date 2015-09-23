var angular = require('angular');
require('angular-ui-router');

describe('ViolationFormController', function () {
    'use strict';
    
    var $httpBackend,
        ctrl,
        mockContext = 'http://localhost:8080/',
        mockViolation = {id: 'e667d1-as78f39', name: 'Foo Violation', releaseable: false},
        mockCollection = [{id: 'a195s2'}, {id: 'bse4y8'}, {id: 'c3rts6'}];

    beforeEach(angular.mock.module('ui.router'));
    
    beforeEach(angular.mock.module('laxstats.admin', function ($provide) {
        $provide.value('ContextResolver', {
            baseUrl: mockContext
        });
        
        $provide.value('ErrorService', {
            processFormErrors: function () {
                return [];
            }
        });
    }));
    
    beforeEach(angular.mock.inject(function (_$httpBackend_, $state, Violation, ErrorService, $controller) {
        $httpBackend = _$httpBackend_;
        
        ctrl = $controller('ViolationFormController', {
                '$state': $state, 
                'model': new Violation(), 
                'Violation': Violation, 
                'ErrorService': ErrorService
            }, {});
    }));
    
    it('should instantiate a controller', function () {
        expect(ctrl).not.toBe(null);
        expect(ctrl.categories.length).toEqual(2);
    });
    
    it('should save a model', function () {
        var url = mockContext + 'api/violations';
        
        $httpBackend.expectPOST(url, {name: mockViolation.name, releaseable: false}).respond(mockViolation);
        $httpBackend.expectGET(url).respond(mockCollection);
        
        ctrl.model.name = mockViolation.name;
        spyOn(ctrl.model, '$save').and.callThrough();    
        
        ctrl.saveOrUpdate();        
        $httpBackend.flush();
        expect(ctrl.model.$save).toHaveBeenCalled();
    });
    
    it('should update a model', function () {
        var getUrl = mockContext + 'api/violations',
            putUrl = getUrl + '/' + mockViolation.id;
        
        $httpBackend.expectPUT(putUrl, mockViolation).respond(mockViolation);
        $httpBackend.expectGET(getUrl).respond(mockCollection);
        
        ctrl.model.id = mockViolation.id;
        ctrl.model.name = mockViolation.name;
        spyOn(ctrl.Violation, 'update').and.callThrough();
        spyOn(ctrl, 'onSuccess').and.callThrough();
        
        ctrl.saveOrUpdate();        
        $httpBackend.flush();
        expect(ctrl.Violation.update).toHaveBeenCalled();
        expect(ctrl.onSuccess).toHaveBeenCalled();
    });
    
    it('should process form errors', function () {
        var url = mockContext + 'api/violations',
            mockResponse = {data: {}};
        
        $httpBackend.expectPOST(url, {releaseable: false}).respond(400, mockResponse);
        spyOn(ctrl, 'onError').and.callThrough();
        
        ctrl.saveOrUpdate();
        $httpBackend.flush();
        expect(ctrl.onError).toHaveBeenCalled();
    });
    
    it('should return the correct button text', function () {
        expect(ctrl.btnText()).toEqual('Create');
        
        ctrl.model.id = mockViolation.id;
        expect(ctrl.btnText()).toEqual('Save');
    });
});