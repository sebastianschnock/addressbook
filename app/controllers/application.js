import Ember from 'ember';

export default Ember.Controller.extend({


    contactDetailsShown: function() {
        return this.get('currentRouteName') === 'contacts.view';
    }.property('currentRouteName')


});
