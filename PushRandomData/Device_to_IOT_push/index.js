var awsIot = require('aws-iot-device-sdk');
var config = require('./config.js');
var device_data = require('../device_data.json');
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1'). NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var device = awsIot.device(config);
var flag = true;
//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function() {
    if(flag){
      console.log('connect');
      //device.subscribe('Camera1');
      var d = new Date();
      for(i in device_data){
        var p = Math.floor(Math.random()*2);
        device.publish(config.topic, JSON.stringify({DeviceKey:device_data[i].DeviceKey,PeopleCount:p,timestamp:d.setDate(d.getDate())}));
        console.log('message sent successfully');
      }
      flag = false;
    }else{
      throw new console.error('Authentication Error');
    }
  });

// device
//   .on('message', function(topic, payload) {
//     console.log('message', topic, payload.toString());
//   });
