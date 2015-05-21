Enwritt.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  routes: {
    '': 'libraryLayout',
    'search': 'resultsLayout'
  },

  libraryLayout: function () {
    var view = new Enwritt.Views.LibraryView();
    this._swapView(view);
  },

  resultsLayout: function () {

  },
  
  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
