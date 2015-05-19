Enwritt.Views.BookShow = Backbone.ModalView.extend({
	template: JST["books/show"],
	render: function () {
		var content = this.template({ book: this.model });

		this.$el.html(content);
		return this;
	}
});