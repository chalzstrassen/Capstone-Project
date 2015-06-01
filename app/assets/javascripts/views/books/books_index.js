Enwritt.Views.BooksIndex = Backbone.View.extend(
  _.extend({}, Enwritt.Mixins.Pagination, {

  template: JST['books'],
  events: {
    "click .book-item" : "showBookModal",
    "click .prev-books" : "prevPage",
    "click .next-books" : "nextPage"
  },
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function () {
    var content = this.template({books: this.collection, links: this.collection._ajaxLinks});
    // <%= links %> will render pagination links
    this.$el.html(content);

    return this;
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
          _fromAuth: false
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
