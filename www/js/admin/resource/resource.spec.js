require('../admin');
require('angular-ui-router');

var angular = require('angular');

describe('Resource', function () {
    'use strict';
    
    var $httpBackend,
        mockResource,
        instance,
        mockContext = 'http://localhost:8080/',
        mockApi = 'api/sites',
        mockCollection = [{id: 1}, {id: 2}, {id: 3}],
        mockEntity = {id: 123};
    
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('laxstats.admin', function ($provide) {
        $provide.value('ContextResolver', {
            baseUrl: mockContext
        });
    }));

    beforeEach(angular.mock.inject(function (_$httpBackend_, Resource) {
        $httpBackend = _$httpBackend_;
        
        mockResource = Resource;
        mockResource.init(mockApi);
    }));
    
    it('should instantiate the service', function () {
        expect(mockResource).not.toBe(null);
    });
    
    it('should fetch a list', function () {
        var url = mockContext + mockApi, collection;
        
        $httpBackend.expectGET(url).respond(mockCollection);
        mockResource.query()
            .then(function (response) {
                collection = response;
            });
        $httpBackend.flush();
        
        expect(collection.length).toEqual(mockCollection.length);
        expect(collection[0].id).toEqual(1);
    });
    
    it('should fetch a specified resource', function () {
        var url = mockContext + mockApi + '/' + mockEntity.id, result;
        
        $httpBackend.expectGET(url).respond(mockEntity);
        mockResource.get({id: 123}).then(function (response) {
            result = response;
        });
        $httpBackend.flush();
        
        expect(result).not.toBe(null);
        expect(result.id).toEqual(mockEntity.id);
    });
    
    it('should save a new instance', function () {
        var url = mockContext + mockApi, 
            newEntity = {foo: 'bar'}, 
            savedEntity = {id: 123, foo: 'bar'}, 
            result;
        
        $httpBackend.expectPOST(url).respond(savedEntity);
        result = mockResource.create(newEntity);
        $httpBackend.flush();
        
        expect(result).not.toBe(null);
        expect(result.id).toEqual(savedEntity.id);
    });
    
    describe('instance methods', function () {
        beforeEach(function () {
            var url = mockContext + mockApi + '/' + mockEntity.id;
            
            $httpBackend.expectGET(url).respond(mockEntity);
            mockResource.get({id: 123}).then(function (response) {
                instance = response;
            });
            $httpBackend.flush();
        });
        
        it('should update an instance', function () {
            var url = mockContext + mockApi + '/' + instance.id, result;
            
            instance.foo = 'bar';
            $httpBackend.expectPUT(url).respond(instance);
            result = mockResource.update(instance);
            $httpBackend.flush();
            
            expect(result.foo).toEqual('bar');
        });
        
        it('should delete an instance', function () {
            var url = mockContext + mockApi + '/' + instance.id;
            
            $httpBackend.expectDELETE(url).respond(200);
            mockResource.delete(instance);
            $httpBackend.flush();
        });
        
        it('should clone an instance', function () {
            var clone = mockResource.clone(instance);
            
            expect(clone).not.toBe(instance);
            expect(clone.id).toEqual(instance.id);
        });
        
        it('should dirty check the instance', function () {
            var clone = mockResource.clone(instance), isDirty;

            isDirty = mockResource.isDirty(instance, clone);
            expect(isDirty).toBe(false);
            
            instance.foo = 'bar';
            isDirty = mockResource.isDirty(instance, clone);
            expect(isDirty).toBe(true);
        });
    });
});