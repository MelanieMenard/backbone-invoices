/*******************************************************************/
/*   Invoices Filtered List View
/*    Use composite views instead of collection views because collection views don't have their own template
/*    children are inserted directly in a plain div, so awful for CSS
/*******************************************************************/

InvoiceApp.InvoicesListView = Backbone.Marionette.CompositeView.extend({

  template: InvoiceApp.Templates['invoice-list'],

  behaviors: {
    // prevent backbone from wrapping the template inside an extra div
    // only remove the wrapper if the template has one inbuilt (i.e. a single top child element)
    removeTemplateWrapperBehavior: {
      behaviorClass: RemoveTemplateWrapperBehavior
    }
  },

  childView: InvoiceApp.InvoiceItemView,

  childViewContainer: '.invoices-table-body',

  // data passed on by root app, shared between views
  appData: null,

  // to pass helper data to the children views (though initialise options)
  childViewOptions: {
    appData: null
  },

  // events fired by the child views
  childEvents: {
    'edit:invoice': 'onEditInvoice',
  },

  collectionEvents: {
    // rerender the view whenever the collection changes, for example when it is filtered
    'add': 'render',
    'remove': 'render',
    'reset': 'render',
    // refilter the collection when a model has changed, as the current filtering may no longer be accurate
    'update': 'applyFilter',
    'change': 'applyFilter'
  },

  // keep track of te last applied filter value
  // it is 'all' by default on initial render
  filterVal: 'all',

  // this is used by views to trigger navigation to a different route
  routerChannel: null,

  initialize: function(options) {
    this.appData = options.appData;
    this.childViewOptions.appData = this.appData;
    // radio channel used by views to trigger navigation to a different route
    this.routerChannel = Backbone.Radio.channel('router');
  },

  onBeforeDestroy: function() {
    // on destroy, reset the filtered collection for the next view that uses it
    this.collection.resetFilter();
  },

  // this method is called by the parent layout view that contains the filter UI, when the filter has changed value
  updateFilter: function(filterVal) {

    // do nothing if filter has not changed
    if (this.filterVal === filterVal) {
      return;
    }
    this.filterVal = filterVal;
    this.applyFilter();
  },

  // the filter is applied when either the filter value has changed
  // or a model has changed, and therefore the current filtering may no longer be accurate
  applyFilter: function() {

    // filter by paid
    if (this.filterVal === 'paid') {
      this.collection.applyPaidFilter(true);
    }
    // filter by unpaid
    else if (this.filterVal === 'unpaid') {
      this.collection.applyPaidFilter(false);
    }
    // show all: reset the filtered collection to full data
    else if (this.filterVal === 'all') {
      this.collection.resetFilter();
    }
  },

  onEditInvoice: function(childView) {

    var invoiceId = childView.model.get('id');

    // invoice item fires an event  caught by the invoice collection 
    // invoice collection then fires an event on the router radio telling the app to route to edit-invoice view
    // do it that way to avoid attaching the radio to every single invoice item view.
    this.routerChannel.trigger('navigate:to:page', 'edit-invoice', invoiceId);
  }

});