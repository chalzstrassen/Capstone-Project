Enwritt.Views.BookForm = Backbone.ModalView.extend({
  template: JST["books/form"],
  tagName: "form",
  className: "book-form",
  render: function () {
    var content = this.template({ book: this.model });
    this.$el.html(content);

    return this;
  }
});
