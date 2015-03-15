import Ember from 'ember';

export default Ember.Route.extend({

    model: function() {
        return this.store.find('contact');
    },



    //--------------------------------------------------------------------------
    //
    //  Actions
    //
    //--------------------------------------------------------------------------



    actions: {

        createNewContact: function() {
            var newRecord = this.store.createRecord('contact');
            newRecord.save().then(function(record) {
                this.transitionTo('contacts.view', record, {queryParams: {edit: true}});
            }.bind(this));
        },

    }
});
