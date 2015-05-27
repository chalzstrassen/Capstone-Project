Enwritt.Views.BookShow = Backbone.ModalView.extend({
	template: JST["books/show"],
	events: {
		"click .delete-book" : "deleteBook",
		"click .edit-book" : "editBook"
	},
	initialize: function (options) {
		this._fromAuth = options._fromAuth
	},
	render: function () {
		var content = this.template({ book: this.model,
									  fromAuth: this._fromAuth });
		this.$el.html(content);
		return this;
	},
	deleteBook: function (event) {
		event.preventDefault();

		var bookId = $(event.currentTarget).data("id");
		var book = this.collection.get(bookId);
		book.destroy({
			success: function () {
				this.collection.remove(book);
				this.hideModal();
			}.bind(this)
		});
	},
	editBook: function (event) {
		event.preventDefault();
		var bookId = $(event.currentTarget).data("id");
		var book = new Enwritt.Models.Book({ id: bookId });
		book.fetch();
		var view = new Enwritt.Views.BookForm({
			model: book,
			collection: this.collection
		});

		this.hideModal();
		view.render().showModal({
			closeImageUrl: "//:0",
      		closeImageHoverUrl: "//:0"
  		});
	}

});