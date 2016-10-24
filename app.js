var winston = require('winston');
require('winston-logstash');
var pm2 = require('pm2');
var pmx = require('pmx');

pmx.initModule({

  widget : {

    logo : 'https://logmatic.io/wp-content/uploads/2016/02/Logmatic-io-Logo.png',

    theme            : ['#141A1F', '#222222', '#3ff', '#3ff'],

    el : {
      probes  : false,
      actions : false
    },

    block : {
      actions : false,
      issues  : false,
      meta    : false,

    }

  }

}, function(err, conf) {

  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Logstash)({
        port: 10515,
        ssl_enable: true,
        host: 'api.logmatic.io',
        max_connect_retries: -1,
        meta: {
          logmaticKey: conf.key 
        },
        node_name: 'pm2 output',
      })
    ]
  });

  pm2.connect(function() {
    logger.log('info', 'PM2: forwarding to logmatics.io');
    console.log('info', 'PM2: forwarding to logmatics.io');
    pm2.launchBus(function(err, bus) {
      bus.on('log:PM2', function(packet) {
        logger.log('info', 'PM2: ' + packet.data);
      })
      bus.on('log:out', function(packet) {
        logger.log('info', packet.data, {app: packet.process.name});
      });
      bus.on('log:err', function(packet) {
        logger.log('info', packet.data, {app: packet.process.name});
      });
    });
  })
});
