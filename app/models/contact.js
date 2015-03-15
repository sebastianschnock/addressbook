import DS from 'ember-data';

export default DS.Model.extend({
    firstName: DS.attr('string', {defaultValue: 'new contact'}),
    lastName: DS.attr('string'),
    address: DS.attr('string'),
    email: DS.attr('string'),

    displayName: function() {
        if(this.get('lastName') !== undefined) {
            return this.get('firstName') + ' ' + this.get('lastName');
        }
        return this.get('firstName');
    }.property('firstName', 'lastName')
});
