/*******************************************************************/
/*   Init code creating a instance of application
/*   This is the only code code that should go in document.ready
/*******************************************************************/


$(function () {
  'use strict';

  // Marionette app init config
  var appConfig = {
    appTitle : 'Demo Invoice App',
    container: '#demo-app',
    // if we fetched the data from a real server, this would be the server endpoint, but here the data is contained inside the webapp
    baseUrl: '',
    invoiceEndpoint: '/api/invoices'
  };

  //create an instance of the App and start it
  window.invoiceApp = new InvoiceApp(appConfig);
  invoiceApp.start();

});
