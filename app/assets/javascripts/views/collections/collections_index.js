Enwritt.Views.CollectionsIndex = Backbone.View.extend({
  template: JST['collections'],
  events: {
    "click .create-collection": "displayModal"
  },
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
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
});
