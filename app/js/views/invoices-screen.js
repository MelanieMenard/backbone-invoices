/*******************************************************************/
/*   Invoices Screen View
/*    Use composite views instead of collection views because collection views don't have their own template
/*    children are inserted directly in a plain div, so awful for CSS
/*******************************************************************/

InvoiceApp.InvoicesScreenView = Backbone.Marionette.LayoutView.extend({

  template: InvoiceApp.Templates['invoices-screen'],

  behaviors: {
    // prevent backbone from wrapping the template inside an extra div
    // only remove the wrapper if the template has one inbuilt (i.e. a single top child element)
    removeTemplateWrapperBehavior: {
      behaviorClass: RemoveTemplateWrapperBehavior
    }
  },

  regions: {
    invoiceList: '.invoices-display'
  },

  // child views
  invoiceListView: null,

  ui: { 
    create: '.invoice-create',
    filter: '.invoice-filter'
  },

  events: { 
    'click @ui.create': 'onInvoiceCreateClicked',
    'change @ui.filter': 'onFilterChange' 
  },

  // data passed on by root app, shared between views
  appData: null,

  // backbone radio channel used by views to trigger navigation to a different route
  routerChannel: null,

  initialize: function(options) {
    this.appData = options.appData;
    // radio channel used by views to trigger navigation to a different route
    this.routerChannel = Backbone.Radio.channel('router');
  },

  onRender: function() {

    // render the filtered collection in a child view
    // the filtered collection need to be in a separate view from the filter control UI
    // otherwise the selected filter state gets rerendered (and therefore resert to all) when the collection is renrendered after filtering
    // by putting the collection in its separate view, it can re-render without affecting the filter
    this.invoiceListView = new InvoiceApp.InvoicesListView({
      // collection uses the filteredInvoices custom type with built-in filter facility
      collection: this.appData.filteredInvoices,
      appData: this.appData
    });
    this.showChildView('invoiceList', this.invoiceListView);
  },

  onInvoiceCreateClicked: function(e) {
    // send a message to the app to navigate to add-invoice view
    this.routerChannel.trigger('navigate:to:page', 'add-invoice');
  },

  onFilterChange: function(e) {

    var filterVal = e.target.value;
    // tell the collection child view to update the filter
    this.invoiceListView.updateFilter(filterVal);

  }

});