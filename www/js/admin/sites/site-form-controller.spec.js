var angular = require('angular');
require('angular-ui-router');

describe('SiteFormController', function () {
    'use strict';
    
    var $httpBackend,
        ctrl,
        mockContext = 'http://localhost:8080/',
        mockSite = {id: 'e667d1-as78f39', name: 'Foo Site'},
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
    
    beforeEach(angular.mock.inject(function (_$httpBackend_, $state, Site, ErrorService, $controller) {
        $httpBackend = _$httpBackend_;
        
        ctrl = $controller('SiteFormController', {
                '$state': $state, 
                'model': new Site(), 
                'Site': Site, 
                'ErrorService': ErrorService
            }, {});
    }));
    
    it('should instantiate a controller', function () {
        expect(ctrl).not.toBe(null);
        expect(ctrl.surfaces.length).toEqual(3);
    });
    
    it('should save a model', function () {
        var url = mockContext + 'api/sites';
        
        $httpBackend.expectPOST(url, {name: mockSite.name}).respond(mockSite);
        $httpBackend.expectGET(url).respond(mockCollection);
        
        ctrl.model.name = mockSite.name;
        spyOn(ctrl.model, '$save').and.callThrough();    
        
        ctrl.saveOrUpdate();        
        $httpBackend.flush();
        expect(ctrl.model.$save).toHaveBeenCalled();
    });
    
    it('should update a model', function () {
        var getUrl = mockContext + 'api/sites',
            putUrl = getUrl + '/' + mockSite.id;
        
        $httpBackend.expectPUT(putUrl, mockSite).respond(mockSite);
        $httpBackend.expectGET(getUrl).respond(mockCollection);
        
        ctrl.model.id = mockSite.id;
        ctrl.model.name = mockSite.name;
        spyOn(ctrl.Site, 'update').and.callThrough();
        spyOn(ctrl, 'onSuccess').and.callThrough();
        
        ctrl.saveOrUpdate();        
        $httpBackend.flush();
        expect(ctrl.Site.update).toHaveBeenCalled();
        expect(ctrl.onSuccess).toHaveBeenCalled();
    });
    
    it('should process form errors', function () {
        var url = mockContext + 'api/sites',
            mockResponse = {data: {}};
        
        $httpBackend.expectPOST(url, {}).respond(400, mockResponse);
        spyOn(ctrl, 'onError').and.callThrough();
        
        ctrl.saveOrUpdate();
        $httpBackend.flush();
        expect(ctrl.onError).toHaveBeenCalled();
    });
    
    it('should return the correct button text', function () {
        expect(ctrl.buttonText()).toEqual('Create');
        
        ctrl.model.id = mockSite.id;
        expect(ctrl.buttonText()).toEqual('Save');
    });
});