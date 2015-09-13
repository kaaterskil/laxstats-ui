import {ROUTES} from '../../core/routes';
var angular = require('angular');

class FieldService {
	constructor($http, ContextResolver) {
    	'ngInject';
    	angular.extend(this, {$http, ContextResolver});
	}
	
	getUrl(id) {
		let url = this.ContextResolver.baseUrl + ROUTES.main.fields;
		if(id) {
			url += '/' + id;
		}
		return url;
	}

	getAll() {
		return this.$http.get(this.getUrl());
	}
	
	get(id) {
		return this.$http.get(this.getUrl(id));
	}
}

export default FieldService;