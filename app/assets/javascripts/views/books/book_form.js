Enwritt.Views.BookForm = Backbone.ModalView.extend({
  template: JST["books/form"],
  tagName: "form",
  className: "book-form",
  events: {
  	"click .publish-button" : "submit"
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
        this.collection.fetch();
  		}.bind(this)
  	});
  	
  }

});
