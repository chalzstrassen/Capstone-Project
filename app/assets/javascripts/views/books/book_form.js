Enwritt.Views.BookForm = Backbone.ModalView.extend({
  template: JST["books/form"],
  render: function () {
    var content = this.template({
      book: this.model
    });
  }
});
