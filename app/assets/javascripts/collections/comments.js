Enwritt.Collections.Comments = Backbone.Collection.extend({
	model: Enwritt.Models.Comment,
	initialize: function (models, options) {
		this.commentable = options.commentable;
	}
});
