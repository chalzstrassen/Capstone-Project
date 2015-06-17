Enwritt.Models.Comment = Backbone.Model.extend({
	commenter: function () {
		var commenterAttrib = this.get("commenter");
		var commenter = new Enwritt.Models.User(commenterAttrib);
		return commenter;
	}
});

Enwritt.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users'
});