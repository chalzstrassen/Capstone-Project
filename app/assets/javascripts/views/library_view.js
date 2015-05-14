Enwritt.Views.LibraryView = Backbone.CompositeView.extend({
  template: JST['shared/library'],

  initialize: function (options) {
    this.$el = options.$el;
    this.addCollectionsIndex();
  },
  addCollectionsIndex: function () {
    var collection = new Enwritt.Collections.Collections();
    collection.fetch();
    var collectionsIndex = new Enwritt.Views.CollectionsIndex({
      collection: collection
    });
    console.log(this);
    this.addSubview('#collections', collectionsIndex);
  }
});
