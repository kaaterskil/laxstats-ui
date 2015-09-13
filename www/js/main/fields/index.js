import FieldService from './field-service';
import FieldController from './field-controller';

export default require('angular')
	.module('laxstats.main.fields', [])
    .controller('FieldController', FieldController)
    .service('FieldService', FieldService);