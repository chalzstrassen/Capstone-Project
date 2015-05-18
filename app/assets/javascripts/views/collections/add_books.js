Enwritt.Views.AddBook = Backbone.View.extend({
	template: JST["collections/add_books"],
	render: function () {
		var content = this.template({books: this.collection});
		this.$el.html(content);

		return this;
	}
});
