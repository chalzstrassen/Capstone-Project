Enwritt.Views.CollectionsIndex = Backbone.View.extend({
  mixins: [Enwritt.Mixins.Pagination],
  template: JST['collections'],
  events: {
    "click .create-collection": "displayModal",
    "click li.collection-item": "showCollection"
  },
  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render);
  },
  render: function () {
    var content = this.template({collections: this.collection});
    this.$el.html(content);

    return this;
  },

  displayModal: function (event) {
    event.preventDefault();

    this.newCollection();
  },

  newCollection: function () {
    var model = new Enwritt.Models.Collection();
    var view = new Enwritt.Views.CollFormView({
      model: model,
      collection: this.collection
    });

    view.render().showModal({
      closeImageUrl: "//:0",
      closeImageHoverUrl: "//:0"
    });
  },

  showCollection: function (event) {
    var collId = $(event.currentTarget).data("id");
    var model = this.collection.getOrFetch(collId);
    var view = new Enwritt.Views.CollectionShow({
      model: model,
      collection: this.collection
    });

    view.render().showModal({
      closeImageUrl: "//:0",
      closeImageHoverUrl: "//:0"
    });

    this.listenTo(view, "closeModalWindow", this.refreshView);
  },

  refreshView: function () {
    this.collection.fetch();
  }
});
