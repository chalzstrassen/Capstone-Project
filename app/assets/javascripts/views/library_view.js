Enwritt.Views.LibraryView = Backbone.CompositeView.extend({
  template: JST['shared/library'],
  events: {
    "click .sign-out": "removeViews"
  },
  initialize: function () {

  },
  addCollectionsIndex: function () {
    var collection = new Enwritt.Collections.Collections();
    collection.fetch();
    var collectionsIndex = new Enwritt.Views.CollectionsIndex({
      collection: collection
    });
    this.addSubview('#collections', collectionsIndex);
  },

  addBooksIndex: function () {
    var collection = new Enwritt.Collections.Books();
    collection.fetch();
    var booksIndex = new Enwritt.Views.BooksIndex({
      collection: collection
    });
    this.addSubview('#books-index', booksIndex);
  },

  addAuthBooks: function () {
    var collection = new Enwritt.Collections.AuthBooks();
    collection.fetch();
    var authBooksView = new Enwritt.Views.AuthBooksView({
      collection: collection
    });

    this.addSubview('#authored-books', authBooksView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.addCollectionsIndex();
    this.addBooksIndex();
    this.addAuthBooks();
    return this;
  }
});
