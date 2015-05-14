Enwritt.Views.CollectionsIndex = Backbone.View.extend({
  template: JST['collections'],
  initialize: function (options) {
    this.$el = $(options.el);
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function () {
    var content = this.template({collections: this.collection});
    this.$el.html(content);

    return this;
  }
});
