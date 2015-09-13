var angular = require('angular');
require('./index');

describe('FieldService', function () {
	'use strict';
	
	var $httpBackend, 
		fieldService,
		mockBaseUrl = 'http://localhost:8080/',
		mockUrl = 'api/sites',
		mockList = [{id: 1},{id: 2}],
		mockField = {id: 1, name: 'Lincoln Sudbury'};
	
	beforeEach(angular.mock.module('laxstats.main.fields', function ($provide) {
		$provide.value('ContextResolver', {
			baseUrl: mockBaseUrl
		});
	}));
	
	beforeEach(angular.mock.inject(function (_$httpBackend_, FieldService) {
		$httpBackend = _$httpBackend_;
		fieldService = FieldService;
	}));
	
	it('should fetch a list of fields', function () {
		var list = [], 
			url = mockBaseUrl + mockUrl;
		
		$httpBackend.expectGET(url).respond(mockList);
		fieldService.getAll()
			.then(function (response) {
				list = response.data;
			});
		
		$httpBackend.flush();
		expect(list.length).toBe(2);
	});
	
	it('should fetch a specified field', function () {
		var field, 
			id = 1,
			url = mockBaseUrl + mockUrl + '/' + id;
		
		$httpBackend.expectGET(url).respond(mockField);
		fieldService.get(id)
			.then(function (response) {
				field = response.data;
			});
		
		$httpBackend.flush();
		expect(field).toBeDefined();
		expect(field.id).toEqual(1);
		expect(field.name).toEqual('Lincoln Sudbury');
	});
});