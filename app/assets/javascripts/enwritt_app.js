window.Enwritt = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Enwritt.Routers.Router({$rootEl: $('#library')});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Enwritt.initialize();
});
