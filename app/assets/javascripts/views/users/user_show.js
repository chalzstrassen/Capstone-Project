Enwritt.Views.UserShow = Backbone.ModalView.extend({
	template: JST["users/show"],
	events: {
		"click #like"          : "like",
		"click #unlike"        : "unlike",
		"submit #comment-form" : "comment",
		"submit #message-form" : "message",
		"click .image-link"    : "showBook"
	},
	initialize: function () {
		this._isLiked = this.model.get("isLiked");
		this._isCurrentUser = this.model.get("isCurrentUser");
		this._likesCount = this.model.get("likes_count");
	},
	render: function () {
		var content = this.template({
			user: this.model,
			isLiked: this._isLiked,
			isCurrentUser: this._isCurrentUser,
			comments: this.model.comments(),
			likesCount: this._likesCount,
			books: this.model.books()
		});
		
		this.$el.html(content);
		return this;
	},
	like: function (event) {
		event.preventDefault();
		var id = this.model.id;
		$.ajax({
			method: "POST",
			url: "/api/users/" + id + "/like",
			success: function (data) {
				this._likesCount++;
				this._isLiked = true;
				this.render();
			}.bind(this)
		});
	},
	unlike: function (event) {
		event.preventDefault();
		var id = this.model.id;
		$.ajax({
			method: "DELETE",
			url: "/api/users/" + id + "/unlike",
			success: function (data) {
				this._likesCount--;
				this._isLiked = false;
				this.render();
			}.bind(this)
		});
	},
	comment: function (event) {
		event.preventDefault();
		var params = $(event.currentTarget).serializeJSON();
		var body = params.comment;
		var comment = new Enwritt.Models.Comment(body);
		var id = this.model.id;
		$.ajax({
			method: "POST",
			url: '/api/users/' + id + '/comment',
			data: params,
			success: function (data) {
				comment._commenter = new Enwritt.Models.User(data);
				this.model.comments().add(comment);
				this.render();
			}.bind(this)
		});
	},
	message: function (event) {
		event.preventDefault();
		var id = this.model.id;
		var params = $(event.currentTarget).serializeJSON();
		$.ajax({
			method: "POST",
			url: '/api/users/' + id + '/message',
			data: params,
			success: function (data) {
				$("#message-box").html("Message sent.");
			}
		})
	},
	showBook: function (event) {
		var bookId = $(event.currentTarget).data("id");
		var bookModel = new Enwritt.Models.Book({id: bookId});
		var that = this;
		bookModel.fetch({
			success: function () {
				var bookShow = new Enwritt.Views.BookShow({
					model: bookModel,
					collection: that.model.books(),
					_fromAuth: false,
				});
	       		that.hideModal();
				bookShow.render().showModal({
		          closeImageUrl: "//:0",
		          closeImageHoverUrl: "//:0"
	       		});
			}
		});


	}
});