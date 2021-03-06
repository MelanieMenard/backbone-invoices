/*******************************************************************/
/*    Edit Invoice view
/*******************************************************************/

InvoiceApp.InvoiceEditView = Backbone.Marionette.ItemView.extend({

  template: InvoiceApp.Templates['invoice-edit'],

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
    // display date in local format, not ISO format from server
    var formattedDate = this.model.get('date').split('T')[0];
    return {
      formattedDate: formattedDate,
      // display error message from server
      message: this.message
    };
  },

  ui: {
    dateInput: '.invoice-date',
    descriptionInput: '.invoice-description',
    amountInput: '.invoice-amount',
    paidInput: '.invoice-paid',
    submit: '.invoice-edit-submit'
  },

  events: { 
    'click @ui.submit': 'onInvoiceEditSubmit'
  },

  modelEvents: {
    'change': 'render'
  },

  // display a message if there was an error saving an invoice to the server
  message: '',

  // data passed on by root app, shared between views
  appData: null,

  // invoice Id provided to view on initialisation
  invoiceId: null,

  // backbone radio channel used by views to trigger navigation to a different route
  routerChannel: null,

  initialize: function(options) {

    // radio channel used by views to trigger navigation to a different route
    this.routerChannel = Backbone.Radio.channel('router');

    // find the model from invoiceId
    this.appData = options.appData;
    this.invoiceId = parseInt(options.invoiceId);
    this.model = this.appData.invoices.findWhere({id: this.invoiceId});
  },

  onInvoiceEditSubmit: function(e) {

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

    //update the model
    this.model.set({
      date: date.toISOString(),
      description: description,
      amount: amount,
      paid: paid
    });

    // capture 'this' for callbacks
    var me = this;
    // save the model to server
    // model.save method wrecks the Id by converting it to a string so use Backbone.sync
    Backbone.sync(
      'update',
      this.model,
       {
        headers: this.appData.requestHeader,
        // by default backbone syncs a model to collection_url/:model_id
        // but we want to use the custom model attribute, not the autogenerated backbone id
        url: this.appData.invoices.url+'/'+this.model.get('id'),
        success: function (model, response, options) {
          me.updateInvoiceSuccess(model, response, options);
        },
        error: function (model, response, options) {
          me.updateInvoiceError(model, response, options);
        }
      }
    );

  },

  updateInvoiceSuccess: function(model, response, options) {
    // emit an event on router channel to navigate back to invoices
    this.routerChannel.trigger('navigate:to:page', 'invoices');
  },

  updateInvoiceError: function(model, response, options) {
    // formatErrorMessage method is on ErrorHandlerMixin
    var formattedError = this.formatErrorMessage(response);
    this.message = formattedError.errorMessage;
    this.render();
  }

});

// Copy the errorHandler mixin methods to InvoiceApp.InvoiceAddView
_.extend(InvoiceApp.InvoiceEditView.prototype, ErrorHandlerMixin);
