var angular = require('angular');

describe('DateDescriptor', function () {
    var descriptor,
        strObject = {
            myDate: '2015-09-28'
        },
        dateObject = {
            myDate: new Date('2015-09-28T14:28:42')
        };
    
    beforeEach(angular.mock.module('laxstats.core'));
    beforeEach(angular.mock.inject(function (DateDescriptor) {
        descriptor = DateDescriptor;
    }));
    
    it('transforms string properties to Date properties', function () {
        var result = descriptor.parseObject(strObject);
        expect(result.myDate instanceof Date).toBe(true);
    });
    
    it('transforms a Date to a string', function () {
        var result = descriptor.toString(dateObject.myDate);
        expect(typeof result).toEqual('string');
    });
});