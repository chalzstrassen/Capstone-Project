Enwritt.Views.BookShow = Backbone.ModalView.extend({
	template: JST["books/show"],
	events: {
		"click .delete-book" : "deleteBook",
		"click .edit-book" : "editBook"
	},
	render: function () {
		var content = this.template({ book: this.model });

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
	}
});