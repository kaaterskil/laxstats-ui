import { VIOLATION_CATEGORIES, VIOLATION_PENALTIES } from '../../core/constants';

var angular = require('angular'), self;

class ViolationFormController{
    constructor($state, model, Violation, ErrorService) {
        'ngInject';
        angular.extend(this, {$state, model, Violation, ErrorService});
        
        self = this;
        this.clone = angular.copy(this.model);
        this.errors = {};
        this.categories = VIOLATION_CATEGORIES;
        this.penalties = VIOLATION_PENALTIES;
    }
    
    btnText() {
        if (this.model.id) {
            return 'Save';
        }
        return 'Create';
    }
    
    onSuccess() {
        self.$state.go('admin.violations.index');
    }
    
    onError(response) {
        console.log(self.ErrorService);
        self.errors = self.ErrorService.processFormErrors(response.data);
    }
    
    saveOrUpdate() {
        // Make sure all booleans are set
        this.model.releaseable = (this.model.releasable) ? true : false;
        
        if (this.model.id && this.model.id.length > 0) {
            this.Violation.update({id: this.model.id}, this.model, this.onSuccess, this.onError);
        } else {
            let violation = new this.Violation(this.model);
            violation.$save(this.onSuccess, this.onError);
        }
    }
}

export default ViolationFormController;