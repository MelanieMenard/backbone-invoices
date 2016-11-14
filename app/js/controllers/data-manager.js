/**********************************************************************************/
/*  Top level Controller responsible from getting data form server, and formatting it in a more useful way when necessary
/**********************************************************************************/

InvoiceApp.DataManager = Backbone.Marionette.Object.extend({

  // store in a app object all the data that needs to be shared with several modules (to reduce init boilerplate code)
  // empty object created by root app with this structure
  // the data manager is responsible for population the 'data' sub-object from the endpoints
  appData : null,

  // Backbone data radio channel
  // Data Manager uses it to broadcast a message that all data have been retrieved, or there was an error
  dataChannel: null,

  // these booleans keep track of which collections/models have been fetched successfully
  // when all data has been fetched, then we can tell the main app to show the main screen
  invoicesFetched: false,

  // check that all core data amongst the above have been fetched
  coreDataFetched: false,

  // MM: when an error happens on data fetch, it is likely to happen several times (on each collection or model)
  // only do error handling once
  errorHandlingInProgress: false,


/* --- Initialisation code  --- */

  initialize: function(config) {
    this.appData = config.appData;

    // Backbone data radio channel
    this.dataChannel = Backbone.Radio.channel('data');

    // create data structures (collections and models) with endpoint urls
    this.initData();

    // fetch data from server
    this.fetchData();
  },

  initData: function() {

    // create data collections with endpoint url for topics
    this.appData.invoices = new InvoiceApp.Invoices(
      null,
      { url: this.appData.endpoints.invoice }
    );
  },

  fetchData: function() {

    this.errorHandlingInProgress = false;

    // capture 'this' for callbacks
    var me = this;

    // get invoice
    this.appData.invoices.fetch({
      reset: true,
      headers: this.appData.requestHeader,
      success: function(model, response, options) {
        var dataName = "invoices";
        me.dataFetchSuccess(model, response, options, dataName);
      },
      error: function(model, response, options) {
        var dataName = "invoices";
        me.dataFetchError(model, response, options, dataName);
      }
    });
  },

  dataFetchSuccess: function(model, response, options, dataName) {

    // mark the collection that was fetched
    if (dataName === "invoices") {
      this.invoicesFetched = true;
      this.createFilteredInvoices();
    }
    
    // check whether all core data have been fetched (unless it's already set and we're fetching additional data)
    // Core data means the data we need to show any content screen, that it's not possible to fail gracefully if it does not get fetched
    if (!this.coreDataFetched) {
      this.checkCoreDataFetched();
    }
  },

  dataFetchError: function(model, response, options, dataName) {

    // MM: when an error happens on collection fetch, it is likely to happen several times (on each collection)
    // only do error handling once
    if (!this.errorHandlingInProgress) {

      this.errorHandlingInProgress = true;

      // formatErrorMessage method is on ErrorHandlerMixin
      var formattedError = this.formatErrorMessage(response);

      // emit an event telling the data fetch error on the data channel
      this.dataChannel.trigger('data:fetch:error', formattedError);
    }
  },

  checkCoreDataFetched: function() {

    // check the individual boolean for each collection that is part of core data
    if (this.invoicesFetched) {
      this.coreDataFetched = true;
    }
      
    // tell the main app all data have been fetched, so it can route to the main screen
    this.dataChannel.trigger('data:fetched');
  },

/* --- invoices collection with built-in filter facility  --- */

  createFilteredInvoices: function() {
    this.appData.filteredInvoices = new InvoiceApp.FilteredInvoices(this.appData.invoices.models);
  }

});

// Copy the errorHandler mixin methods to InvoiceApp.DataManager
_.extend(InvoiceApp.DataManager.prototype, ErrorHandlerMixin);
