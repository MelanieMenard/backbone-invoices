this["InvoiceApp"] = this["InvoiceApp"] || {};
this["InvoiceApp"]["Templates"] = this["InvoiceApp"]["Templates"] || {};

this["InvoiceApp"]["Templates"]["app-layout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header id=\"header\"></header>\n<main id=\"main\"></main>";
},"useData":true});

this["InvoiceApp"]["Templates"]["error-screen"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<section id=\"error\" class=\"page-content\">\n  <div class=\"error-notice\">\n    <p class=\"error-message\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n  </div>\n   <div class=\"btn-row\">\n    <button type=\"button\" class=\"back-home btn\">Back to invoices</button>\n  </div>\n</section>\n";
},"useData":true});

this["InvoiceApp"]["Templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"header-inner\" class=\"header-inner\">\n\n  <div class=\"brand\">\n    <h1 class=\"brand-title\">"
    + container.escapeExpression(((helper = (helper = helpers.appTitle || (depth0 != null ? depth0.appTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"appTitle","hash":{},"data":data}) : helper)))
    + "</h1>\n  </div>\n\n</div>\n";
},"useData":true});

this["InvoiceApp"]["Templates"]["invoice-add"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div class=\"error-notice\">\n      <p class=\"error-message\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n      <button class=\"error-close\" title =\"Close\">X</button>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"invoice-add-screen page-content\">\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  <form action=\"/\">\n    <label>\n      Date\n      <input class=\"invoice-date\" type=\"date\">\n    </label>\n    <label>\n      Description\n      <input class=\"invoice-description\" type=\"text\">\n    </label>\n    <label>\n      Amount\n      <input class=\"invoice-amount\" type=\"number\">\n    </label>\n    <label>\n      Paid\n      <input class=\"invoice-paid\" type=\"checkbox\">\n    </label>\n  </form>\n  <div class=\"btn-row\">\n    <button type=\"button\" class=\"invoice-add-submit btn\">Add Invoice</button>\n    <button type=\"button\" class=\"back-home btn\">Cancel</button>\n  </div>\n\n</section>\n";
},"useData":true});

this["InvoiceApp"]["Templates"]["invoice-edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div class=\"error-notice\">\n      <p class=\"error-message\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n      <button class=\"error-close\" title =\"Close\">X</button>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section class=\"invoice-edit-screen page-content\">\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  <form action=\"/\">\n    <label>\n      Date\n      <input class=\"invoice-date\" type=\"date\" value=\""
    + alias4(((helper = (helper = helpers.formattedDate || (depth0 != null ? depth0.formattedDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formattedDate","hash":{},"data":data}) : helper)))
    + "\">\n    </label>\n    <label>\n      Description\n     <input class=\"invoice-description\" type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\">\n    </label>\n    <label>\n      Amount\n      <input class=\"invoice-amount\" type=\"number\" value=\""
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "\">\n    </label>\n    <label>\n      Paid \n      <input class=\"invoice-paid\" type=\"checkbox\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.paid : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n    </label>\n  </form>\n  <div class=\"btn-row\">\n    <button type=\"button\" class=\"invoice-edit-submit btn\">Update Invoice</button>\n    <button type=\"button\" class=\"back-home btn\">Cancel</button>\n  </div>\n\n</section>\n";
},"useData":true});

this["InvoiceApp"]["Templates"]["invoice-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " paid";
},"3":function(container,depth0,helpers,partials,data) {
    return "Mark as unpaid";
},"5":function(container,depth0,helpers,partials,data) {
    return "Mark as paid";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "£"
    + container.escapeExpression(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"amount","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr class=\"invoices-table-row"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.paid : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n  <td><button type=\"button\" class=\"invoice-toggle-paid\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.paid : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</span></td>\n  <td>"
    + alias4(((helper = (helper = helpers.formattedDate || (depth0 != null ? depth0.formattedDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formattedDate","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</td>\n  <td class=\"table-data-number\">"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.paid : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n  <td class=\"table-data-number\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.paid : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n  <td><button type=\"button\" class=\"invoice-edit\">Edit</button></td>\n</tr>";
},"useData":true});

this["InvoiceApp"]["Templates"]["invoice-list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<table class=\"invoices-table\">\n  <thead class=\"invoices-table-head\">\n    <tr>\n      <th></th>\n      <th>Date</th>\n      <th>Description</th>\n      <th>Unpaid Amounts</th>\n      <th>Paid Amounts</th>\n      <th></th>\n    </tr>\n  </thead>\n  <tbody class=\"invoices-table-body\">\n  </tbody>\n</table>\n";
},"useData":true});

this["InvoiceApp"]["Templates"]["invoices-screen"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section class=\"invoices page-content\">\n\n  <section class=\"invoices-control screen-full\">\n\n    <div class=\"screen-left\">\n      <button type=\"button\" class=\"invoice-create btn\">Add a new invoice</button>\n    </div>\n\n    <div class=\"screen-right\">\n      <form>\n        <label for=\"invoice-filter\">Show:</label>\n        <select name=\"invoice-filter\" class=\"invoice-filter\">\n          <option value=\"all\">All</option>\n          <option value=\"paid\">Paid</option>\n          <option value=\"unpaid\">Unpaid</option>\n        </select>\n      </form>\n    </div>\n\n  </section>\n\n  <section class=\"invoices-display screen-full\">\n\n  </section>\n\n</section>\n";
},"useData":true});

this["InvoiceApp"]["Templates"]["loading-screen"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"loading\">\n  <div class=\"loader\">Loading...</div>\n</section>\n";
},"useData":true});