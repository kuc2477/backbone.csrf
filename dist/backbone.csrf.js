/*global define*/

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'), require('backbone'));
  } else {
    // Browser globals
    factory(jQuery, Backbone);
  }
}(function($, Backbone) {
  /**
   * Initializes Backbone.sync to set 'X-CSRFToken' request header for
   * every requests it sends.
   *
   * You must add <meta name='csrf-token' content={{ csrf_token }}> to your
   * DOM, for example, in case of Django.
   *
   * @param   {boolean}   jqueryCSRF
   * @return  {undefined}
   */
  function initialize(jqueryCSRF) {
    // Get csrf token from the meta tag.
    var token = $("meta[name='csrf-token']").attr('content') || '';

    if (!token) {
      // Throw error message otherwise.
      throw 'csrf-token meta tag has not been set';
    }

    // Configure Backbone.sync to set 'X-CSRFToken' request header for
    // every single requests if token exists.
    var originalSync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
      // We need token only when it is non-GET requests.
      if (method !== 'fetch') {
        options.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-CSRFToken', token);
        };
      }

      return originalSync(method, model, options);
    };

    // Configure jquery.ajax just in case of making requset with direct
    // jquery, rather than useing Backbone ORM if given parameter 
    // `jqueryCSRF` is true.
    if (typeof jqueryCSRF !== 'undefined' && jqueryCSRF === true) {
      $.ajaxSetup({
        beforeSend: function(xhr, settings) {
          if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
            xhr.setRequestHeader('X-CSRFToken', token);
          }
        }
      });
    }
  }

  return {initialize: initialize};
}));
