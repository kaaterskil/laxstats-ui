require('./index');

var angular = require('angular');

describe('BaseResource', function () {
    var $httpBackend,
        BaseResource,
        mock,
        context = 'http://localhost:8080/',
        superUrl = context + 'base-resources',
        mockUrl = context + 'mocks',
        mockId = 'a534c9db-dde3f821a4c73b47-fee6c8a1',
        jsonMock = {'id':mockId, 'nickname':'foo'};
    
    beforeEach(angular.mock.module('active-record', function ($provide) {
        $provide.value('ContextResolver', {baseUrl: context});
    }));
    
    beforeEach(angular.mock.inject(function (_$httpBackend_, _BaseResource_) {
        $httpBackend = _$httpBackend_;
        BaseResource = _BaseResource_;
        
        function Mock(data) {
            BaseResource.call(this);
            for(var prop in data) {
                if(data.hasOwnProperty(prop)) {
                    this[prop] = data[prop];
                }
            }
        }
        Mock.prototype = Object.create(BaseResource.prototype);
        Mock.prototype.constructor = Mock;
        
        mock = new Mock({nickname: 'foo'});
        mock.api.setUrl();
    }));
    
    it('should instantiate a resource', function () {
        var resource = new BaseResource();
        resource.api.setUrl();
        
        expect(resource).not.toBe(null);
        expect(resource.className).toBe('BaseResource');
        expect(resource.primaryKey).toBe('id');
        expect(resource.api.createUrl).toEqual(superUrl);
    });
    
    it('should save a new resource', function () {
        var result;
        $httpBackend.expectPOST(mockUrl, mock).respond(jsonMock);
        
        mock.$save().then(function (response) {
            result = response;
        });
        $httpBackend.flush();
        
        expect(result).not.toBe(null);
        expect(result.nickname).toEqual('foo');
        expect(result.api.createUrl).toEqual(mockUrl);
    });
    
    it('should update an existing resource', function () {
        var result, 
            url = mockUrl + '/' + mockId, 
            updatedMockJson = {'id':mockId, 'nickname':'bar'};
        
        mock.id = mockId;
        mock.nickname = 'bar';
        $httpBackend.expectPUT(url, mock).respond(updatedMockJson);
        
        mock.$save().then(function (response) {
            result = response;
        });
        $httpBackend.flush();
        
        expect(result).not.toBe(null);
        expect(result.id).toEqual(mockId);
        expect(result.nickname).toEqual('bar');
    });
    
    it('should find an existing resource', function () {
        var result, url = mockUrl + '/' + mockId;
        
        mock.id = mockId;
        $httpBackend.expectGET(url).respond(jsonMock);
        
        mock.get({id: mockId}).then(function (resp) {
            result = resp;
        });
        $httpBackend.flush();
        
        expect(result).not.toBe(null);
        expect(result.id).toEqual(mockId);
        expect(result.nickname).toEqual('foo');
    });
    
    it('should find a cached resource', angular.mock.inject(function (_$rootScope_) {
        var result, $rootScope = _$rootScope_;
        
        mock.id = mockId;
        mock.cacheInstance(mock);
        mock.get({id: mockId}).then(function (resp) {
            result = resp;
        });
        $rootScope.$digest();

        expect(result).not.toBe(null);
        expect(result.id).toEqual(mockId);
        expect(result.nickname).toEqual('foo');
    }));
    
    it('should delete a resource', function () {
        var result, cachedEntity, url = mockUrl + '/' + mockId;
        
        mock.id = mockId;
        mock.cacheInstance(mock);
        $httpBackend.expectDELETE(url).respond(jsonMock);
        
        mock.$delete().then(function (response) {
            result = response;
            cachedEntity = mock.cache.get(mockId);
        });
        $httpBackend.flush();

        expect(result).not.toBe(null);
        expect(result.id).toEqual(mockId);
        expect(result.nickname).toEqual('foo');
        
        expect(cachedEntity).toBe(null);
        expect(mock.cache.size).toEqual(0);
    });
    
    it('should return all resources', function () {
        var result, url = mockUrl;
        $httpBackend.expectGET(url).respond([jsonMock]);
        
        mock.all().then(function (resp) {
            result = resp;
        });
        $httpBackend.flush();
        
        expect(result).not.toBe(null);
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(mockId);
    });
});