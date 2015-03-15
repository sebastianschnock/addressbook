import Ember from 'ember';

export default Ember.Controller.extend({


    contactDetailsShown: function() {
        console.log(this.get('currentRouteName') === 'contacts.view');
        return this.get('currentRouteName') === 'contacts.view';
    }.property('currentRouteName')


});
