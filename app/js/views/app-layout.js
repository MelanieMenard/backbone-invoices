/*******************************************************************/
/*   View: displays the header and swaps out the views in the main content area
/*******************************************************************/

InvoiceApp.AppLayout = Backbone.Marionette.LayoutView.extend({

  el: '#demo-app',

  template: InvoiceApp.Templates['app-layout'],

  regions: {
    header: '#header',
    main: '#main'
  },

  // data passed on by root app, shared between views
  appData: null,

/* --- init data --- */

  initialize: function(options) {
    this.appData = options.appData;
  },

/* --- intitial rendering of the app Layout (render header, footer and  default main view) --- */

  onRender: function() {

    // render the header only by default
    // the main view is put in the main region depending on which route is requested
    // here the header is minimal, just a title, so it could be put directly in the app layout without being a child view
    // however, a separate header view makes the app easily extensible if we wanted to add a navbar to switch between views
    var headerView = new InvoiceApp.HeaderView({
      appData: this.appData
    });
    this.showChildView('header', headerView);
  },

/* --- the router tells the app layout to show a specific child view in the 'main' region --- */

  showLoadingScreen: function() {
    var loadingScreen = new InvoiceApp.LoadingScreen();
    this.showChildView('main', loadingScreen);
  },

  showErrorScreen: function(errorType) {
    var errorScreen = new InvoiceApp.ErrorScreen({
      errorType: errorType
    });
    this.showChildView('main', errorScreen);
  },

  // invoices filtered table
  showInvoicesScreen: function() {
    var invoicesScreenView = new InvoiceApp.InvoicesScreenView({
      appData: this.appData
    });
    this.showChildView('main', invoicesScreenView);
  },

  // add invoice
  showInvoiceAddScreen: function() {
    var invoiceAddScreenView = new InvoiceApp.InvoiceAddView({
      appData: this.appData
    });
    this.showChildView('main', invoiceAddScreenView);
  },

  // edit invoice
  showInvoiceEditScreen: function(invoiceId) {

    var invoiceEditScreenView = new InvoiceApp.InvoiceEditView({
      invoiceId: invoiceId,
      appData: this.appData
    });
    this.showChildView('main', invoiceEditScreenView);
  }

});
