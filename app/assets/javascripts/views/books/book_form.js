Enwritt.Views.BookForm = Backbone.ModalView.extend({
  template: JST["books/form"],
  tagName: "form",
  className: "book-form",
  events: {
  	"click .publish-button" : "submit",
    "click .edit-button" : "updateBook",
    "change #input-cover-image" : "fileInputChange",
    "change #input-content-pdf" : "pdfFileChange"
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

  	var formData = $(".book-form").serializeJSON().book;
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

    var formData = $(".book-form").serializeJSON().book;
    debugger;
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        this.hideModal();
        this.collection.set(this.model, { remove: false });
      }.bind(this)
    });
  },

  fileInputChange: function(event){
    console.log(event.currentTarget.files[0]);

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._cover = reader.result;
      console.log(that.model);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
      delete that.model._cover;
      console.log(that.model);
    }
  },

   _updatePreview: function(src){
    this.$el.find("#preview-cover-image").attr("src", src);
  },

  pdfFileChange: function (event) {
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      that.model._content = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete that.model._content;
    }
  }

});
