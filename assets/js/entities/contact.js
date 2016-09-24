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
    Entities.configureStorage(Entities.ContactCollection);
    var contacts;

    var initializeContacts = function(){
      contacts = new Entities.ContactCollection([
        { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184"},
        { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163"},
        { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129"}
      ]);
        contacts.forEach(function(contact){
            contact.save();
        });
        return contacts.models;
    };

    var API = {
      getContactsEntities: function(){
        var contacts = new Entities.ContactCollection();
          var defer = $.Deferred();
          contacts.fetch({
              success: function (data) {
                  defer.resolve(data)
              }
          });
          var promise = defer.promise();
          $.when(promise).done(function (contacts) {
              if (contacts.length === 0){
                  var models = initializeContacts();
                  contacts.reset(models);
              }
          });
          return promise;
      },
      getContactEntity: function(contactID){
          var contact = new Entities.Contact({id: contactID});
          var defer = $.Deferred();
          setTimeout(function () {
              contact.fetch({
                  success: function (data){
                      defer.resolve(data);
                  },
                  error: function (data){
                      defer.resolve(undefined);
                  }
              });
          }, 2000);

          return defer.promise();
      }
    };
    ContactManager.reqres.setHandler("contact:entities", function(){
      return API.getContactsEntities();
    });
    ContactManager.reqres.setHandler("contact:entity", function (id){
        return API.getContactEntity(id);
    })
});