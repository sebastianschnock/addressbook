import Ember from 'ember';

export default Ember.ObjectController.extend({

    displayName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName')

});
