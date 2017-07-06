'use strict';

console.log('Loading function');
const AWS = require("aws-sdk");
const doc = require('dynamodb-doc');
AWS.config.update({region: "ap-northeast-2"});

const dynamo = new doc.DynamoDB();
exports.handler = (event, context, callback,tableName) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    var data = {
        TableName:tableName,
        Item:event
    };
  //  var d = new Date();
  //  data.Item['id'] = String(d.setDate(d.getDate()));
    dynamo.putItem(data, function(err,res){
        if(err){
            callback(null,"Error adding data : "+err);
        }else{
            console.log(res);
            callback(null,"Succesfully added the record with : "+JSON.stringify(res));
        }
    });
};
