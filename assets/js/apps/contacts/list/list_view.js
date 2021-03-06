ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",

    events: {
      "click": "highlightName",
      "click button.js-delete": "deleteClicked",
      "click td a.js-show": "showClicked"
      },
    highlightName: function(e){
        this.$el.toggleClass("warning");
        this.trigger("contact:model", this.model);
    },
    deleteClicked: function (e) {
      e.stopPropagation();
      this.trigger("contact:delete", this.model);
    },
    showClicked: function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(this);
      this.trigger("contact:show", this.model)
    },
    remove: function () {
      var self = this;
      this.$el.fadeOut(function(){
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });
  List.Contacts = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#contact-list",
    childView: List.Contact,
    childViewContainer: "tbody"
  });
});