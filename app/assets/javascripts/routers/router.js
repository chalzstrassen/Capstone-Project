Enwritt.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  routes: {
    '': 'libraryLayout',
    'collections/new': 'newCollection'
  },

  libraryLayout: function () {
    var view = new Enwritt.Views.LibraryView();

    this._swapView(view);
  },

  newCollection: function () {
    var model = new Enwritt.Models.Collection();
    var view = new Enwritt.Views.CollFormView({model: model});
    this.currentView = view;
    view.render().showModal({
      closeImageUrl: "//:0",
      closeImageHoverUrl: "//:0"
    });
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
