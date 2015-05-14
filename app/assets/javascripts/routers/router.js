Enwritt.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  routes: {
    '': 'libraryItems'
  },
  libraryItems: function () {
    var collCollection = new Enwritt.Collections.Collections();
    var bookCollection = new Enwritt.Collections.Books();
    collCollection.fetch({
    	success: function () {
    		bookCollection.fetch({
    			success: function () {
    				var libView = new Enwritt.Views.LibraryView({
    					collCollection: collCollection,
    					bookCollection: bookCollection
    				});

    				this.$rootEl.html(libView.render().$el);
    			}
    		}
    	}
    });
  }

});
