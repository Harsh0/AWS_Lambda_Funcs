const crypto = require('crypto');
const fs = require('fs');
var jsonDevice =[];
var jsonRoom = [];
var task = require('./data_to_dynamo.js');
var context ={};
var response = [];
var callback = function(err,res){
  response.push(res);
}
var csv = fs.readFileSync('../data.csv').toString();
csv = csv.trim();
csv = csv.split('\n');
csv.forEach(function(line,index){
  csv[index] = line.split(',');
});
for(var i=1;i<csv.length;i++){
  var deviceData = {
    //generate one random DeviceKey
    DeviceKey:crypto.randomBytes(20).toString('hex'),
    //generate Some random RoomId
    RoomId:crypto.randomBytes(8).toString('hex'),
    RoomName:csv[i][csv[0].indexOf('RoomName')]
  }
  //save into json
  var d = new Date();
  var roomData = {
    RoomId:deviceData.RoomId,
    RoomName:csv[i][csv[0].indexOf('RoomName')],
    Building:csv[i][csv[0].indexOf('Building')],
    Floor:csv[i][csv[0].indexOf('Floor')],
    Location:{lat:parseFloat(csv[i][csv[0].indexOf('latitude')]),lon:parseFloat(csv[i][csv[0].indexOf('longitude')])},
    CurrentStatus:"Empty",
    VideoConf:csv[i][csv[0].indexOf('VideoConf')]=='true'?true:false,
    updatedAt:d.setDate(d.getDate())
  }
  //push into table
  task.handler(deviceData,context,callback,'DeviceData');
  task.handler(roomData,context,callback,'RoomData');
  jsonDevice.push(deviceData);
  jsonRoom.push(roomData);
}
//save into json file
fs.writeFileSync('../device_data.json',JSON.stringify(jsonDevice,null,2));
fs.writeFileSync('../room_data.json',JSON.stringify(jsonRoom,null,2));
console.log('File written Succesfully');
var checkDB = function(){
  if(response.length<(csv.length-1)){
    setTimeout(checkDB,500);
  }else{
    //invoke simulated device to push data into aws iot
    require('../Device_to_IOT_push');
  }
}
setTimeout(checkDB,1000);
