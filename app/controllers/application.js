import Ember from 'ember';

export default Ember.ArrayController.extend({

    sortProperties: ['firstName', 'lastName'],
    sortAscending: true,

    contactDetailsShown: function() {
        return this.get('currentRouteName') === 'contacts.view';
    }.property('currentRouteName'),

    hi: function() {
        console.log('application HI!');
    }.on('init')
});
