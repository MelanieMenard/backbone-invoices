/**********************************************************************************/
/*  Behaviours are methods shared between views to keep code DRY
/*  Error Notice: on screen (not pop up) error notice with a close button to dismiss it
/**********************************************************************************/

var ErrorNoticeBehavior = Marionette.Behavior.extend({
  
  ui: {
    errorNotice: '.error-notice',
    errorClose: '.error-close'
  },

  // Behaviors have events that are bound to the views DOM.
  events: {
    'click @ui.errorClose': 'onErrorClose'
  },

  onErrorClose: function(e) {
    
    // MM: needed otherwise it happens twice!
    e.stopPropagation();
    e.preventDefault();

    // al views using this behavior should store the error message as 'message'
    // clearing the message itself on the view ensure the alter box will be hidden next time we render
    this.view.message = '';
    // but for now, avoid re-rendering the whole view just to hide a small error notice
    this.ui.errorNotice[0].classList.add('is-hidden');
  }

});