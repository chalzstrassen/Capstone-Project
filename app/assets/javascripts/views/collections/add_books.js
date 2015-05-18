Enwritt.Views.AddBook = Backbone.View.extend({
	template: JST["collections/add_books"],
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render);
	},
	render: function () {
		var content = this.template({books: this.collection});
		console.log("zombie check");
		this.$el.html(content);

		return this;
	}
});
