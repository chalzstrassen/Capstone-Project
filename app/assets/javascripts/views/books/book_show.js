Enwritt.Views.BookShow = Backbone.ModalView.extend({
	template: JST["books/show"],
	events: {
		"click .delete-book" : "deleteBook",
		"click .edit-book"   : "editBook",
		"submit #comment"    : "comment",
		"click #like"        : "like",
		"click #unlike"		 : "unlike",
		"click #show-mini-profile" : "showAuthor"
	},
	initialize: function (options) {
		this._fromAuth = options._fromAuth
		this.listenTo(this.model.comments(), "add", this.render);
		this._likesCount = this.model.get("likes_count");
		this._isLiked = this.model.get("isLiked");
	},
	render: function () {
		var comments = this.model.comments();
		var content = this.template({ book: this.model,
									  fromAuth: this._fromAuth,
									  comments: comments,
									  likesCount: this._likesCount,
									  isLiked: this._isLiked,
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
		var comment = new Enwritt.Models.Comment({body: body})
		$.ajax({
			method: "POST",
			url: '/api/books/' + id + '/comment',
			data: {body: body},
			success: function (data) {
				comment._commenter = new Enwritt.Models.User(data);
				this.model.comments().add(comment);
				this.render();
			}.bind(this)
		});
	},
	like: function (event) {
		event.preventDefault();
		var bookId = this.model.id;
		$.ajax({
			method: "POST",
			url: "/api/books/" + bookId + "/like",
			success: function (data) {
				this._likesCount++;
				this._isLiked = true;
				this.render();
			}.bind(this)
		});
	},
	unlike: function (event) {
		event.preventDefault();
		var bookId = this.model.id;
		$.ajax({
			method: "DELETE",
			url: "/api/books/" + bookId + "/unlike",
			success: function (data) {
				this._likesCount--;
				this._isLiked = false;
				this.render();
			}.bind(this)
		});
	},
	showAuthor: function (event) {
		event.preventDefault();
		var userID = $(event.currentTarget).data("id");
		var user = new Enwritt.Models.User({id: userID});
		user.fetch({
			success: function () {
				var userShow = new Enwritt.Views.UserShow({model: user});
				this.hideModal();
				userShow.render().showModal({
          closeImageUrl: "//:0",
          closeImageHoverUrl: "//:0"
        });
			}.bind(this)
		});
	}

});