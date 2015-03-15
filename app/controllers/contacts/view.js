import Ember from 'ember';

export default Ember.ObjectController.extend({

    isEditing: false,



    //--------------------------------------------------------------------------
    //
    //  Actions
    //
    //--------------------------------------------------------------------------



    actions: {

        edit: function() {
            this.set('isEditing', true);
        },

        save: function() {
            this.set('isEditing', false);
            return true;
        },

        closeDetails: function() {
            this.set('isEditing', false);
            this.transitionToRoute('contacts');
        }
    }
});
