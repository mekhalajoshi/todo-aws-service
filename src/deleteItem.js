'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-2"});

exports.deleteItem = async (payload) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2"});
  
  let responseBody = "";
  let statusCode = 0;

  console.log(payload);
  // Get all(Scan) items
  const params = {
    TableName: "Todos",
    Key: {
      todoId: payload.todoId
    }
  };
  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = "201";
  } catch (err) {
    console.log(err);
    responseBody = err.message;
    statusCode = err.statusCode;
  }
  const result = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    },
    body: responseBody
  };

  return result;
};

