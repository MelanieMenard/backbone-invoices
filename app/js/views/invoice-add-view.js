/*******************************************************************/
/*    Add Invoice view
/*******************************************************************/

InvoiceApp.InvoiceAddView = Backbone.Marionette.ItemView.extend({

  template: InvoiceApp.Templates['invoice-add'],

  behaviors: {
    // prevent backbone from wrapping the template inside an extra div
    // only remove the wrapper if the template has one inbuilt (i.e. a single top child element)
    removeTemplateWrapperBehavior: {
      behaviorClass: RemoveTemplateWrapperBehavior
    },
    // Cancel button navigates to invoice list
    backHomeButtonBehavior: {
      behaviorClass: BackHomeButtonBehavior
    },
    // Display on-screen error notice
    errorNoticeBehavior: {
      behaviorClass: ErrorNoticeBehavior
    }
  },

  // backbone templateHelpers allow to pass custom data to the template beside the default model data
  templateHelpers: function() {
    return {
      // display error message from server
      message: this.message
    };
  },

  ui: {
    dateInput: '.invoice-date',
    descriptionInput: '.invoice-description',
    amountInput: '.invoice-amount',
    paidInput: '.invoice-paid',
    submit: '.invoice-add-submit'
  },

  events: { 
    'click @ui.submit': 'onInvoiceAddSubmit'
  },

  modelEvents: {
    'change': 'render'
  },

  // display a message if there was an error saving an invoice to the server
  message: '',

  // data passed on by root app, shared between views
  appData: null,

  // backbone radio channel used by views to trigger navigation to a different route
  routerChannel: null,

  initialize: function(options) {
    this.appData = options.appData;
    // radio channel used by views to trigger navigation to a different route
    this.routerChannel = Backbone.Radio.channel('router');
  },

  onInvoiceAddSubmit: function(e) {

    var description = this.ui.descriptionInput.val();
    if (description === '') {
      alert('Please enter a description');
      return;
    }

    var amount = parseFloat(this.ui.amountInput.val());
    if (amount < 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (this.ui.paidInput.is(":checked")){
      var paid = true;
    }
    else {
      var paid = false;
    }

    var dateVal = this.ui.dateInput.val();
    var date = new Date();
    date.setTime(Date.parse(dateVal));
    var dateNow = new Date();
    if (dateNow - date < 0) {
      alert('Please enter a date in the past.');
      return;
    }

    // increment the Id from highest one used so far
    var usedIds = this.appData.invoices.pluck('id');
    var lastId = _.max(usedIds);
    var id = lastId+1;

    // create a new model with server endpoint
    var newInvoice = new InvoiceApp.Invoice({
      id: id,
      date: date.toISOString(),
      description: description,
      amount: amount,
      paid: paid
    });

    // add the model to the collections
    this.appData.invoices.add(newInvoice);
    this.appData.filteredInvoices.add(newInvoice);

    // capture 'this' for callbacks
    var me = this;
    // backone sync with 'create' method does a POST request
    // direct the collection to POST to the endpoint with no Id parameter
    Backbone.sync(
      'create',
      newInvoice,
      {
        headers: this.appData.requestHeader,
        // by default backbone syncs a model to collection_url/:model_id
        // for this server we must POST new models directly to collection_url so we override the url manually
        url: this.appData.invoices.url,
        success: function (model, response, options) {
          me.createInvoiceSuccess(model, response, options);
        },
        error: function (model, response, options) {
          me.createInvoiceError(model, response, options);
        }
      }
    );

  },

  createInvoiceSuccess: function(model, response, options) {
    // emit an event on router channel to navigate back to invoices
    this.routerChannel.trigger('navigate:to:page', 'invoices');
  },

  createInvoiceError: function(model, response, options) {
    // formatErrorMessage method is on ErrorHandlerMixin
    var formattedError = this.formatErrorMessage(response);
    this.message = formattedError.errorMessage;
    this.render();
  }

});
// Copy the errorHandler mixin methods to InvoiceApp.InvoiceAddView
_.extend(InvoiceApp.InvoiceAddView.prototype, ErrorHandlerMixin);
