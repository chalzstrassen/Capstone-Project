Enwritt.Models.Book = Backbone.Model.extend({
  urlRoot: "/api/books",
  toJSON: function () {
  	var json = {book: _.clone(this.attributes)};

  	if (this._cover) {
  		json.book.cover = this._cover;
  	}

  	if (this._content) {
  		json.book.content = this._content;
  	}

  	return json;
  }
});
