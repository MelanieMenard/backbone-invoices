/* ------------------------------------------------------------------------------ */
/*   Invoice Models and Collections
/* ------------------------------------------------------------------------------ */

/* --- Invoice model --- */

InvoiceApp.Invoice = Backbone.Model.extend({

  defaults: {
    id: 0,
    // ISO string date from server
    date: '',
    description: '',
    amount: 0,
    paid: false
  },

  // toggle paid state on invoice model
  togglePaidState: function() {

    var newState = !(this.get('paid'));
    this.set({paid: newState});
  },

  // Format the raw data fetched from server
  parse : function(response, options){

    // I've had a problem with numbers (id and amount) being converted to strings after an update
    // I don't know enough about express servers to know whether it comes from it or a backbone oddity
    // fix it that way for the purpose of this test
    if (typeof response.id === 'string') {
      response.id = parseInt(response.id);
    }
    if (typeof response.amount === 'string') {
      response.amount = parseFloat(response.amount);
    }

    return response;
  }
});

/* --- Invoices Collection --- */
InvoiceApp.Invoices = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: InvoiceApp.Invoice,

  initialize : function(models,options) {
    this.url = options.url;
  }

});

/* ----------------------------- */
/*   Custom data structrure for a filtered collection containing an internal reference to the full collection so you can reset to it when a filter is removed
/*   Code adapted from p80 of 'Backbone.js patterns and best practices'
/* ----------------------------- */

InvoiceApp.FilteredInvoices = Backbone.Collection.extend({

  // full collection to reset to
  totalData: [],
  isFiltered: false,

  initialize : function(models,options) {
    
    // save full data
    if (models) {
      this.totalData = models;
    }
  },

  // filter by 'paid' attribute
  applyPaidFilter : function(desiredPaidStatus) {

    // reset to full data before applying new filter, otherwise result may be empty!
    this.resetFilter();

    // filter method of backbone collections return all models matching a condition
    var subfilterResult = this.models.filter(function(model) {

      var invoicePaidStatus = model.get('paid');
      var isModelMatching = (desiredPaidStatus === invoicePaidStatus);
      
      return isModelMatching;
    });

    // reset the collection with the matching results
    this.reset(subfilterResult);

    // mark that the collection has been filtered
    this.isFiltered = true;
  },

  // clear the filter by resetting the collection to full data
  resetFilter : function() {

    // do nothing if the collection has never been filtered and already contains the full data
    if (this.isFiltered) {
      this.reset(this.totalData );
      this.isFiltered = false;
    }
  }
});

