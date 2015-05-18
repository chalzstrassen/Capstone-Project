Enwritt.Views.AddBook = Backbone.View.extend({
	template: JST["collections/add_books"],
	events: {
		"click .add-book" : "addBook"
	},
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render);
	},
	render: function () {
		var content = this.template({books: this.collection});
		this.$el.html(content);

		return this;
	},
	addBook: function (event) {
		event.preventDefault();

		var bookId = $(event.currentTarget).data("id");
		var collId = this.model.id;

		var that = this;
		$.ajax({
			url: "/api/collects",
			method: "POST",
			data: {collection_id: collId, book_id: bookId},
			dataType: "json",
			success: function () {
				that.model.fetch({
					success: function () {
						that.render();
					}
				});
			},
			error: function (xhr, responseText) {
				alert(responseText);
			}
		});
	}
});
