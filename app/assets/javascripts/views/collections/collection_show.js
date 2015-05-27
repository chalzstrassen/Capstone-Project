Enwritt.Views.CollectionShow = Backbone.ModalView.extend({
  template: JST["collections/show"],
  className: "show-view",
  events: {
  	"click #edit-collection": "showForm",
    "click #add-book": "addBookForm",
    "click .remove-book": "removeBook",
    "click .search-button": "search"
  },
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.searchResults = new Enwritt.Collections.SearchResults();
    this.listenTo(this.searchResults, "sync", this.renderSearchResults);
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
    var bookCollection = new Enwritt.Collections.AvailBooks();
    this._addBookView = bookCollection;
    var that = this;
    bookCollection.fetch({
      data: { id: this.model.id },
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

  removeBook: function (event) {
    event.preventDefault();
    var bookId = $(event.currentTarget).data("id");
    var collId = this.model.id;
    var that = this;
    $.ajax({
			url: "/api/collects/1",
			method: "DELETE",
			data: {collection_id: collId, book_id: bookId},
			dataType: "json",
			success: function () {
				that.model.fetch({
					success: function () {
						that.render();
					}
				});
			},
			error: function (xhr, responseText) {
				alert(responseText);
			}
		});
  },
  renderSearchResults: function () {
    var books = this.searchResults;
    var content = JST["searches/book_hits"]({ books: books });
    this.$(".collection-books").html(content);
  },
  search: function (event) {
    event.preventDefault();
    this.searchResults._query = this.$(".search-box").val();
    if (this.searchResults._query === "") {
      this.model.fetch();
    } else {
      this.searchResults.fetch({
        data: {
          query: this.searchResults._query,
          id: this.model.id
        }
        // success: function (obj, responseText) {
        //   this.renderSearchResults();
        //   console.log(responseText);
        // }.bind(this)
      });
      
    }
  }
});
