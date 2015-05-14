Enwritt.Views.LibraryView = Backbone.Marionette.LayoutView.extend({
  template: JST['shared/library'],
  regions: {
    collections: "#collections",
    booksIndex: "#books-index",
    authoredBooks: "#authored-books"
  },

  initialize: function (options) {
    this.$el = options.$el;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
