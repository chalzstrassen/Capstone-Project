window.Enwritt = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    if (Backbone.History.started) {
    	Backbone.history.navigate("#");
    } else {
    	new Enwritt.Routers.Router({$rootEl: $('#library')});
    	Backbone.history.start();
    }
  }
};
