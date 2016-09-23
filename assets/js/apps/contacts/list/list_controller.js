ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
  List.Controller ={
    listContacts: function(){
      var contacts = ContactManager.request("contact:entities");

      var contactsListView = new List.Contacts({
        collection: contacts
      });
      contactsListView.on("childview:contact:delete", function (childView, model){
        contacts.remove(model);
      });
      contactsListView.on("childview:contact:show", function (chlidView, model) {
        ContactManager.trigger("contacts:show", model.get("id"));
      });

      ContactManager.mainRegion.show(contactsListView);
    }
  }
});