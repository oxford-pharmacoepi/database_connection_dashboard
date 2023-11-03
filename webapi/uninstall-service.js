var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Express WebAPI',
  description: 'The nodejs web server.',
  script: '<porject_root>\\webapi\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('uninstall',function(){
  svc.start();
});

svc.uninstall();