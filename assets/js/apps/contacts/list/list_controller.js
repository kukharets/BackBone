ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function () {
            var fetchingContacts = ContactManager.request("contact:entities");

            $.when(fetchingContacts).done(function (contacts) {
                var contactsListView = new List.Contacts({
                    collection: contacts
                });

                contactsListView.on("childview:contact:delete", function (childView, model) {
                    model.destroy();
                });
                contactsListView.on("childview:contact:show", function (chlidView, model) {
                    ContactManager.trigger("contacts:show", model.get("id"));
                });

                ContactManager.mainRegion.show(contactsListView);

            });
        }
}
});