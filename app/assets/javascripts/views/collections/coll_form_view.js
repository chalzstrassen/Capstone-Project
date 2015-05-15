Enwritt.Views.CollFormView = Backbone.ModalView.extend({
  template: JST['collections/form'],
  events: {

  },
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this, "closeModalWindow", this.toLibrary);
  },
  render: function () {
    var content = this.template({collection: this.model});

    this.$el.html(content);

    return this;
  },
  toLibrary: function () {
    Backbone.history.navigate("#", {trigger: true});
  }
});
