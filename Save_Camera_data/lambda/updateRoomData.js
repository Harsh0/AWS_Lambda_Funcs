const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const tableRoom = 'RoomData';
module.exports = (event)=>{
  return new Promise((resolve,reject)=>{
    d = new Date();
    params = {
      TableName:tableRoom,
      Key:{
          "RoomId":event.RoomId
      },
      UpdateExpression: "set CurrentStatus = :s, updatedAt=:p",
      ExpressionAttributeValues:{
          ":s":event.PeopleCount>0?"Occupied":"Empty",
          ":p":d.setDate(d.getDate())
      },
      ReturnValues:"ALL_NEW"
    };
    docClient.update(params, function(err,res){
      if(err){
        reject(err);
      }else{
        console.log("Succesfully added the record with : "+JSON.stringify(res.Attributes));
        resolve(res.Attributes.RoomName);
      }
    });
  });
}
