const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const tableDevice = 'DeviceData';
module.exports = (event)=>{
  return new Promise((resolve,reject)=>{
    var params = {
      TableName: tableDevice,
      Key:{
        "DeviceKey": event.DeviceKey
      }
    };
    docClient.get(params,(err,data)=>{
      if(err){
        reject(err);
      }else{
        event.DeviceKey = undefined;
        event.RoomId = data.Item.RoomId;
        resolve(event);
      }
    });
  });
}
