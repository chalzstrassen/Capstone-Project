Enwritt.Views.AddBook = Backbone.View.extend({
	template: JST["collections/add_books"],
	events: {
		"click .add-book"   : "addBook",
		"click .prev-books" : "prevPage",
  	    "click .next-books" : "nextPage",
		"click #close"      : "hideView",
		"keyup #books-page" : "gotoPage"
	},
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render);
	},
	render: function () {
		var content = this.template({ books: this.collection, 
									  totalPages: this.collection._totalPages,
									  page: this.collection._page
									});
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
			error: function (xhr, resp) {
				alert(resp);
			}
		});
	},
	hideView: function (event) {
		event.preventDefault();
		this.$el.empty();
		this.stopListening(this.collection);
	},
	prevPage: function (event) {
		event.preventDefault();
		var collection = this.collection;
		if (collection._page) {
			if (collection._page > 1) {
				collection._page -= 1;
				collection.fetch({
					data: { page: collection._page,
						   id: this.model.id }
				});
			}
		}

	},
	nextPage: function (event) {
		event.preventDefault();
		var collection = this.collection;
		if (collection._page && collection._totalPages) {
			if (collection._page < collection._totalPages) {
				collection._page += 1;
				collection.fetch({
					data: { page: collection._page,
							id: this.model.id }
				});
			}
		}
	},
	gotoPage: function (event) {
		event.preventDefault();
		if (event.which == 13) {
			var toPage = $(event.currentTarget).val();
			var collection = this.collection;
			if (collection._totalPages) {
				if (toPage > 0 && toPage <= collection._totalPages) {
					collection.fetch({
						data: { page: toPage, 
								id: this.model.id }
					});
				}
				
			}
		}
	}
});
