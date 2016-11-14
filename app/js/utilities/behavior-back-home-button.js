/**********************************************************************************/
/*  Behaviours are methods shared between views to keep code DRY
/*  backHomeButton: a button that leads back to the main screen (invoices in this case)
/* The view using this behaviour must have the router radio channel defined
/* the button in the view template should have class 'back-home'
/**********************************************************************************/

var BackHomeButtonBehavior = Backbone.Marionette.Behavior.extend({
 
  ui: { 
    backHome: '.back-home'
  },

  events: { 
    'click @ui.backHome': 'onBackHomeClicked'
  },

  // return to main screen
  onBackHomeClicked: function(e) {
    // send a message to the app to navigate to invoices view
    this.view.routerChannel.trigger('navigate:to:page', 'invoices');
  }
});