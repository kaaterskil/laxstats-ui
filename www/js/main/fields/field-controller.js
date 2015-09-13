class FieldController {
    constructor($scope, FieldService) {
    	'ngInject';
        this.$scope = $scope;
        
        FieldService.getAll().then(response => $scope.list = response.data);
    }
}

export default FieldController;