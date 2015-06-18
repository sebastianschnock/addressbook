import Ember from 'ember';

export default Ember.Controller.extend({

    queryParams: ['edit'],
    edit: false,



    //--------------------------------------------------------------------------
    //
    //  Actions
    //
    //--------------------------------------------------------------------------



    actions: {

        switchToEditMode: function() {
            this.set('edit', true);
        },

        save: function() {
            this.set('edit', false);
            return true;
        },

        closeDetails: function() {
            this.set('edit', false);
            this.transitionToRoute('contacts');
        }
    }

});
