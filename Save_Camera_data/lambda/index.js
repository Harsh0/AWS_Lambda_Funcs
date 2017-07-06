'use strict';
//function to update camera data into dynamodb as well as updating other tables accordin to data received
console.log('Loading function');

const getRoomId = require('./getRoomId');
const storeCameraData = require('./storeCameraData');
const updateRoomData = require('./updateRoomData');
exports.handler = (event, context, callback) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));
  getRoomId(event)
    .then(storeCameraData)
    .then(updateRoomData)
    .then(RoomName=>{
      callback(null,"Succesfully added and updated records for Room : "+RoomName);
    })
    .catch(err=>{
      callback(err,null);
    });
};
