Enwritt.Views.CollectionShow = Backbone.ModalView.extend({
  template: JST["collections/show"],
  events: {
  	"click #edit-collection": "showForm" 
  },
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  render: function () {
    var books = this.model.get("books");
    var content = this.template({
      collection: this.model,
      books: _(books)
    });
    this.$el.html(content);

    return this;
  },
  showForm: function (event) {
  	event.preventDefault();

  	this.hideModal();
  	var view = new Enwritt.Views.CollFormView({
  		collection: this.collection,
  		model: this.model
  	});

  	view.render().showModal({
  		closeImageUrl: "//:0",
      closeImageHoverUrl: "//:0"});
  }

});
