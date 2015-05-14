Enwritt.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  routes: {
    'library': 'libraryLayout'
  },

  libraryLayout: function () {
    var collCollection = new Enwritt.Collections.Collections();
    collCollection.fetch();

    var view = new Enwritt.
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
