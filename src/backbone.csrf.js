/**
 * Note: `backbone.csrf` currently only supports AMD sepcification.
 *
 * Usage:
 *
 *      // main.js
 *      
 *      require(['backbone', 'backbone.csrf'], function(Backbone, BackboneCSRF) {
 *          BackboneCSRF.initialize();
 *
 *                      .
 *                      .
 *                      .
 *
 *          // Your application business logic
 *                      
 *                      .
 *                      .
 *                      .
 *      });
 *
 *
 */
define('backbone.csrf', ['jquery', 'backbone'], function($, Backbone) {
    'user strict';

    /**
     * Initializes Backbone.sync to set 'X-CSRFToken' request header for
     * every requests it sends.
     *
     * You must add <meta name='csrf-token' content={{ csrf_token }}> to your
     * DOM, for example, in case of Django.
     *
     * @return {undefined}
     */
    function initialize() {
        // Get csrf token from the meta tag.
        var token = $("meta[name='csrf-token']").attr('content') || '';
        
        // Configure Backbone.sync to set 'X-CSRFToken' request header for
        // every single requests if token exists.
        if (token) {
            var originalSync = Backbone.sync;
            Backbone.sync = function(method, model, options) {
                options.beforeSend = function(xhr) {
                    xhr.setRequestHeader('X-CSRFToken', token);
                };
                return originalSync(method, model, options);
            };
        } else {
            // Throw error message otherwise.
            throw 'csrf-token meta tag has not been set';
        }
    }

    return {
        initialize: initialize
    };
});
