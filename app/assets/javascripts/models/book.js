Enwritt.Models.Book = Backbone.Model.extend({
  urlRoot: "/api/books",
  parse: function (resp) {
    this._author = resp.author
    delete resp.author
    if (resp.comments) {
      this.comments().set(resp.comments)
      delete resp.comments
    }
    return resp;
  },
  toJSON: function () {
  	var json = {book: _.clone(this.attributes)};

  	if (this._cover) {
  		json.book.cover = this._cover;
  	}

  	if (this._content) {
  		json.book.content = this._content;
  	}

  	return json;
  },
  comments: function () {
    if (!this._comments) {
      this._comments = new Enwritt.Collections.Comments([], {commentable: this });
    }

    return this._comments;
  }
});
