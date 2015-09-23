import { SITE_SURFACES, SITE_STYLES, REGIONS } from '../../core/constants'; 

var angular = require('angular'),
    self;

class SiteFormController {
    constructor($state, model, Site, ErrorService) {
        'ngInject';
        
        angular.extend(this, {$state, model, Site, ErrorService});
        self = this;
        this.clone = angular.copy(model);
        this.errors = {};
        
        this.surfaces = SITE_SURFACES;
        this.styles = SITE_STYLES;
        this.regions = REGIONS;
    }
    
    buttonText() {
        if (this.model.id) {
            return 'Save';
        }
        return 'Create';
    }
    
    onSuccess(data, headers) {
        self.$state.go('admin.sites.index');
    }
    
    onError(response) {
        self.errors = self.ErrorService.processFormErrors(response.data);
    }
    
    saveOrUpdate(){
        if (this.model.id && this.model.id.length > 0) {
            this.Site.update({id: this.model.id}, this.model, this.onSuccess, this.onError);
        } else {
            let site = new this.Site(this.model);
            site.$save(this.onSuccess, this.onError);
        }
    }
}

export default SiteFormController;