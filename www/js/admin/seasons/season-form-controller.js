var angular = require('angular'),
    self;

class SeasonFormController {
    constructor($state, model, Season, ErrorService, DateDescriptor) {
        'ngInject';
        angular.extend(this, {$state, model, Season, ErrorService, DateDescriptor});
        
        self = this;
        this.original = angular.copy(model);
        this.errors = {};
    }
    
    btnText() {
        if (this.model.id) {
            return 'Save';
        }
        return 'Create';
    }
    
    onSuccess() {
        self.$state.go('admin.seasons.index');
    }
    
    onError(response) {
        self.errors = self.ErrorService.processFormErrors(response.data);
    }
    
    saveOrUpdate() {
        // Format dates to strip any time component
        let clone = angular.copy(this.model);
        clone.startsOn = this.DateDescriptor.toString(clone.startsOn);
        if(clone.endsOn) {
            clone.endsOn = this.DateDescriptor.toString(clone.endsOn);
        }
        
        // Initiate persistence
        if (clone.id && clone.id.length > 0) {
            this.Season.update({id: clone.id}, clone, this.onSuccess, this.onError);
        } else {
            let season = new this.Season(clone);
            season.$save(this.onSuccess, this.onError);
        }
    }
}

export default SeasonFormController;