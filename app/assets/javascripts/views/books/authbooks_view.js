Enwritt.Views.AuthBooksView = Backbone.View.extend({
  template: JST["books/authbooks"],
  events: {
    "click .publish-book" : "showBookForm",
    "click .authbook-item" : "showBookModal"
  },
  initialize: function () {
    this.listenTo(this.collection, "sync add", this.render);
  },
  render: function () {
    var content = this.template({books: this.collection});

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
          collection: that.collection
        });

        view.render().showModal({
          closeImageUrl: "//:0",
          closeImageHoverUrl: "//:0"
        });
      }
    });
  }
});
