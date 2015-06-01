Enwritt.Views.AuthBooksView = Backbone.View.extend(
  _.extend({}, Enwritt.Mixins.Pagination, {

  template: JST["books/authbooks"],
  events: {
    "click .publish-book" : "showBookForm",
    "click .book-item" : "showBookModal",
    "click .prev-books" : "prevPage",
    "click .next-books" : "nextPage",
    "keyup #books-page" : "gotoPage"
  },
  initialize: function () {
    this.listenTo(this.collection, "sync add remove change", this.render);
  },
  render: function () {
    var content = this.template({
      books: this.collection,
      page: this.collection._page,
      totalPages: this.collection._totalPages
    });

    this.$el.html(content);
    return this;
  },
  showBookForm: function (event) {
    event.preventDefault()
    var newBook = new Enwritt.Models.Book();
    var view = new Enwritt.Views.BookForm({
      model: newBook,
      collection: this.collection
    });

    view.render().showModal({
      closeImageUrl: "//:0",
      closeImageHoverUrl: "//:0"
    });
  },
  showBookModal: function (event) {
    event.preventDefault();
    var bookId = $(event.currentTarget).data("id");
    var model = new Enwritt.Models.Book({ id: bookId });
    var that = this;
    model.fetch({
      success: function () {
        var view = new Enwritt.Views.BookShow({
          model: model,
          collection: that.collection,
          _fromAuth: true
        });

        view.render().showModal({
          closeImageUrl: "//:0",
          closeImageHoverUrl: "//:0"
        });
      }
    });
  }
})
);
