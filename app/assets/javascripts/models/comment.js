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
	urlRoot: '/api/users'
});