import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {

    this.resource('contacts', function() {
        this.route('view', {
            path: ':contact_id'
        });
    });
});

export default Router;
