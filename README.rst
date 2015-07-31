=============
backbone.csrf
=============
Configure your *Backbone* application to be compatible with your csrf-protected backend web frameworks


Author
======
* `Ha Junsoo <kuc2477@gmail.com>`_


Compatibility
=============
* Only supports AMD specification


Dependencies
============
* *backbone.csrf* supports `Backbone.js <https://backbone.org>`_ 1.7.1 or later
* Requires `jQuery <https://jquery.com>`_


Installation
============
.. code-block:: shell

    bower install backbone.csrf

    
Build
=====
.. code-block:: shell

    npm install && grunt


Rationale
=========
Although there are few cases where a *Backbone* application plays alone without any backend frameworks such as *Django*, *Rails*, *Play*, etc, *Backbone* itself lacks support for csrf token authentication, which most of backend web frameworks requires for client side requests for the sake of their security.

*backbone.csrf* will make your Backbone application compatible with your backend web frameworks that implements CSRF protecting systems, such as *Django*, *Rails*, etc.

Module's the only method ``initialize()`` configures ``Backbone.sync()`` to set *X-CSRFToken* request header for every requests it sends so that make sure all backbone requests are sent with csrf tokens.

You can also configure your *jquery*'s ``$.ajax`` calls by passing ``true`` to ``initialize()`` call. This will allow you to send csrf-protection compatible requests to backends directly with ``$.ajax`` calls. This can be useful in case when you need requests that doesn't match *Backbone* ORM.


Usage
=====
1. Add ``<meta name='csrf-token' content={{ csrf_token }}>`` to your markup.  

2. Initialize *backbone.csrf* before you start your *Backbone* application.

   .. code-block:: javascript

       /* main.js */

       require(['backbone', 'backbone.csrf'], function(Backbone, BackboneCSRF) {
           // Initialize `backbone.csrf`
           BackboneCSRF.initialize();

           // Your backbone application starts after the csrf initialization
           ...
       });


Change Log
==========
* 1.0.1 (July 31, 2015):

  - Set ``X-CSRFToken`` header on requests only when it is non-fetch requests.
  
  - Set ``X-CSRFToken`` header on *jquery.ajax* requests by calling ``initialize()`` with boolean parameter ``true``. Default is ``false``.
