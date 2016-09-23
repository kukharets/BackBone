ContactManager.module("Entities", function (Entities, ContactManager,Backbone,Marionette, $, _) {
    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts"
    });
    Entities.configureStorage(Entities.Contact);
    Entities.ContactCollection = Backbone.Collection.extend({
      model: Entities.Contact,
      comparator: "firstName",
        url: "contacts"
    });

    var contacts;

    var initializeContacts = function(){
      contacts = new Entities.ContactCollection([
        { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184"},
        { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163"},
        { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129"}
      ]);
    };

    var API = {
      getContactsEntities: function(){
        if(contacts === undefined){
          initializeContacts();
        }
        return contacts;
      }
    };
    ContactManager.reqres.setHandler("contact:entities", function(){
      return API.getContactsEntities();
    })
});