Enwritt.Views.UserShow = Backbone.ModalView.extend({
	template: JST["users/show"],
	events: {

	},
	initialize: function () {
		this._isLiked = this.model.get("isLiked");
		this._isCurrentUser = this.model.get("isCurrentUser");
	},
	render: function () {
		var content = this.template({
			user: this.model,
			isLiked: this._isLiked,
			isCurrentUser: this._isCurrentUser,
			comments: this.model._comments
		});
		
		this.$el.html(content);
		return this;
	}
});