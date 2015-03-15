import Ember from 'ember';

export default Ember.Route.extend({



    //--------------------------------------------------------------------------
    //
    //  Actions
    //
    //--------------------------------------------------------------------------



    actions: {

        save: function(contact) {
            contact.save();
        },

        delete: function(contact) {
            this.store.deleteRecord(contact);
            contact.save();
            this.transitionTo('contacts');
        }
    }
});
