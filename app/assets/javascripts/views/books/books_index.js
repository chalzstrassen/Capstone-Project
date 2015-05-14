Enwritt.Views.BooksIndex = Backbone.View.extend({
  template: JST['books'],
  initialize: function (options) {
    this.$el = $(options.el);
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function () {
    var content = this.template({books: this.collection});
    this.$el.html(content);

    return this;
  }
});
