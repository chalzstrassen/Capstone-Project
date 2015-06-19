Enwritt.Views.UserShow = Backbone.ModalView.extend({
	template: JST["users/show"],
	events: {
		"click #like"          : "like",
		"click #unlike"        : "unlike",
		"submit #comment-form" : "comment",
		"submit #message-form" : "message"
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
			likesCount: this._likesCount
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
});