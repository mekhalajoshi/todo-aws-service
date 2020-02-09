'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-2"});

exports.postItem = async (payload) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2"});
  
  let statusCode = 0;

  console.log(payload);
  // Get all(Scan) items
  const params = {
    TableName: "Todos",
    Item: JSON.parse(payload)
  };
  try {
    await documentClient.put(params).promise();
    statusCode = "201";
  } catch (err) {
    console.log(err);
    statusCode = "403";
  }
  const result = {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  return result;
};

