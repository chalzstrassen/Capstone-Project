Enwritt.Views.BookShow = Backbone.ModalView.extend({
	template: JST["books/show"],
	events: {
		"click .delete-book" : "deleteBook",
		"click .edit-book"   : "editBook",
		"submit #comment"    : "comment"
	},
	initialize: function (options) {
		this._fromAuth = options._fromAuth
	},
	render: function () {
		var comments = this.model.comments();
		var content = this.template({ book: this.model,
									  fromAuth: this._fromAuth,
									  comments: comments,
									  author: this.model._author });
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
	},
	comment: function (event) {
		event.preventDefault();
		var id = this.model.id;
		var body = $("textarea.form-text").val();
		$.ajax({
			method: "POST",
			url: '/api/books/' + id + '/comment',
			data: {body: body},
			success: function (data) {
				var commenter = new Enwritt.Models.User(data);
				var comment = new Enwritt.Models.Comment({body: body, commenter: commenter});
				this.model.comments().add(comment);
				this.render();
			}.bind(this)
		});
	}

});