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
        }
    }
});
