require('./index');

var angular = require('angular');

describe('ResourceCache', function() {
    var cache, 
        obj = {
            id: 'd5a2ba63-cca1f8b4',
            name: 'foo'
        }, 
        key = obj.id;

    beforeEach(angular.mock.module('active-resource'));
    beforeEach(angular.mock.inject(function(ResourceCache) {
        cache = new ResourceCache('test');
    }));

    it('should instantiate', function() {
        expect(cache).not.toBe(null);
        expect(cache.name).toBe('test');
    });

    it('should store a value', function() {
        cache.put(key, obj);
        expect(cache.size).toEqual(1);
    });

    describe('cache operations', function() {
        beforeEach(function() {
            cache.put(key, obj);
        });

        it('should fetch a value', function() {
            var result;
            result = cache.get(key);
            expect(result).toBeDefined();
            expect(result.id).toEqual(key);
            expect(result.name).toEqual('foo');
        });
        
        it('should return null when fetching an invalid value', function () {
            var result;
            result = cache.get('abcdef');
            expect(result).toBeDefined();
            expect(result).toBe(null);
        });
        
        it('should add a value', function () {
            var obj = {id: 'a2b3c4d5-e6f7a8b9c0d1e2f3', name: 'baz'};
            cache.put(obj.id, obj);
            expect(cache.size).toEqual(2);
        });
        
        it('should replace a value', function () {
            var newObj = {id: key, name: 'bar'}, result;
            
            result = cache.put(key, newObj);
            expect(cache.size).toEqual(1);
            expect(result).toBeDefined();
            expect(result.name).toEqual('foo');
            
            result = cache.get(key);
            expect(result.name).toEqual('bar');
        });
        
        it('should remove a value', function () {
            var result = cache.remove(key);
            expect(result.name).toEqual('foo');
            expect(cache.size).toEqual(0);
            
            result = cache.get(key);
            expect(result).toBe(null);
        });
        
        it('should clear its store', function () {
            cache.removeAll();
            expect(cache.size).toBe(0);
            expect(cache.get(key)).toBe(null);
        });
    });
});
