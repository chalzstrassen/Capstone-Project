Enwritt.Views.BookForm = Backbone.ModalView.extend({
  template: JST["books/form"],
  tagName: "form",
  className: "book-form",
  events: {
  	"click .publish-button" : "submit",
    "click .edit-button" : "updateBook"
  },
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  render: function () {
    var content = this.template({ book: this.model });
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
  	event.preventDefault();

  	var formData = $(".book-form").serializeJSON();

  	this.model.set(formData);
  	this.model.save({},{
  		success: function () {
  			this.hideModal();
        this.collection.add(this.model)
  		}.bind(this)
  	});
  },
  
  updateBook: function (event) {
    event.preventDefault();

    var formData = $(".book-form").serializeJSON();
    this.model.set(formData);
    this.model.save();
  }

});
