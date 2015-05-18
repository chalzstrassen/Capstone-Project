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
		console.log("zombie check");
		this.$el.html(content);

		return this;
	},
	addBook: function (event) {
		event.preventDefault();

		var bookId = $(event.currentTarget).data("id");
		var collId = this.model.id;

		$.ajax({
			url: "/api/collects",
			method: "POST",
			data: {collection_id: collId, book_id: bookId},
			dataType: "json"
		}).done(function () {
			alert("Book added successfully");
		});
	}
});
