/*******************************************************************/
/*   View: Error Screen
/*******************************************************************/

InvoiceApp.ErrorScreen = Backbone.Marionette.ItemView.extend({

  template: InvoiceApp.Templates['error-screen'],

  behaviors: {
    // Button navigates to invoice list
    backHomeButtonBehavior: {
      behaviorClass: BackHomeButtonBehavior
    }
  },

  // error type passed on by app
  errorType: '',

  // display message explaining error type
  message: '',

  // backbone radio channel used by views to trigger navigation to a different route
  routerChannel: null,

  initialize: function(options) {

    // radio channel used by views to trigger navigation to a different route
    this.routerChannel = Backbone.Radio.channel('router');

    this.errorType = options.errorType;

    if (this.errorType === 'server') {
      this.message = 'There was a problem getting data from the server. Please wait a few minutes and try reloading the app.'
    }
    else if (this.errorType === 'pageNotFound') {
      this.message = 'The page you requested was not found.'
    }
  },

  templateHelpers: function () {
    return {
      message: this.message
    };
  }

});
