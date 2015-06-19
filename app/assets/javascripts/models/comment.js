Enwritt.Models.Comment = Backbone.Model.extend({
	commenter: function () {
		if (!this._commenter) {
			var commenterAttrib = this.get("commenter");
			this._commenter = new Enwritt.Models.User(commenterAttrib);			
		}
		
		return this._commenter;
	}
});

Enwritt.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users',
	parse: function (resp) {
		if (resp.comments) {
			var comments = resp.comments;
			this._comments = new Enwritt.Collections.Comments(comments, {commentable: this});
			delete resp.comments;
		}

		return resp;
	},

	comments: function () {
	    if (!this._comments) {
	      this._comments = new Enwritt.Collections.Comments([], {commentable: this });
	    }

	    return this._comments;
   }
});