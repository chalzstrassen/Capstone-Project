Enwritt.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  routes: {
    'library': 'libraryLayout'
  },
  libraryLayout: function () {
    var libView = new Enwritt.Views.LibraryView({
        $el: this.$rootEl
			 });

    libView.render();
    this._renderCollections(libView);
    // var collCollection = new Enwritt.Collections.Collections();
    // var bookCollection = new Enwritt.Collections.Books();
    // var that = this;
    // collCollection.fetch({
    // 	success: function () {
    // 		bookCollection.fetch({
    // 			success: function () {
    // 				var libView = new Enwritt.Views.LibraryView({
    //           $el: that.$rootEl
    // 				});
    //
    // 				that.$rootEl.html(libView.render().$el);
    // 			}
    // 		});
    // 	}
    // });
  },

  _renderCollections: function (libView) {
    var collCollection = new Enwritt.Collections.Collections();
    collCollection.fetch();
    var collectionsIndex = new Enwritt.Views.CollectionsIndex({
      collection: collCollection,
      el: libView.getRegion('collections').el
    })

    this.$rootEl.html(collectionsIndex.render().$el);
  }

});
