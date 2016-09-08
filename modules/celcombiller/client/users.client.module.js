(function (app) {
  'use strict';

  app.registerModule('celcombiller');
  app.registerModule('celcombiller.credit');
  app.registerModule('celcombiller.historic');
  app.registerModule('celcombiller.user');
  app.registerModule('celcombiller.admin');
  app.registerModule('celcombiller.admin.routes', ['ui.router', 'core.routes', 'users.admin.services']);
  app.registerModule('celcombiller.admin.services');
  app.registerModule('celcombiller.routes', ['ui.router', 'core.routes']);
  app.registerModule('celcombiller.services');
}(ApplicationConfiguration));
