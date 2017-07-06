'use strict';
var AWS = require('aws-sdk');
AWS.config.update({
  region: "ap-northeast-2"
});
var docClient = new AWS.DynamoDB.DocumentClient();
var table = 'CameraData';
exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    var d = new Date();
    var params = {
        TableName:table,
        Item:{
            "id":d.setDate(d.getDate()).toString(),
            test_data1: event.test_data1,
            test_data2: event.test_data2,
            timestamp:event.timestamp
        }
    };
    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, `Error adding records.`);
        } else {
            console.log("Added item:", JSON.stringify(data));
            callback(null, `Successfully processed records.`);
        }
    });

};
