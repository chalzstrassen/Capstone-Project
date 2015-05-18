Enwritt.Views.CollectionShow = Backbone.ModalView.extend({
  template: JST["collections/show"],
  events: {
  	"click #edit-collection": "showForm",
    "click #add-book": "addBookForm"
  },
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  render: function () {
    var books = this.model.get("books");
    var content = this.template({
      collection: this.model,
      books: _(books)
    });
    this.$el.html(content);

    return this;
  },
  showForm: function (event) {
  	event.preventDefault();

  	this.hideModal();
  	var view = new Enwritt.Views.CollFormView({
  		collection: this.collection,
  		model: this.model
  	});

  	view.render().showModal({
  		closeImageUrl: "//:0",
      closeImageHoverUrl: "//:0"});
  },

  addBookForm: function (event) {
    event.preventDefault();
    var bookCollection = new Enwritt.Collections.Books();
    this._addBookView = bookCollection;
    var that = this;
    bookCollection.fetch({
      success: function () {
        var view = new Enwritt.Views.AddBook({
          collection: bookCollection,
          model: that.model,
          el: ".available-books"
        });

        view.$el.html(view.render().$el);
      }
    });
  },
});
