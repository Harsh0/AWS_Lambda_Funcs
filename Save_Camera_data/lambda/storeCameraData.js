const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');
const tableCamera = 'CameraData';
var current_date = (new Date()).valueOf().toString();
var random = Math.random().toString();
module.exports = (event)=>{
  return new Promise((resolve,reject)=>{
    event['RecordId'] = crypto.createHash('sha1').update(current_date + random).digest('hex');
    var data = {
      TableName:tableCamera,
      Item:event
    };
    docClient.put(data,(err,res)=>{
      if(err){
        reject(err);
      }else{
        resolve(event);
      }
    });
  });
}
