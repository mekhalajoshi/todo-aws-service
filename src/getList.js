'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-2"});

exports.getList = async () => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2"});
  
  let responseBody = "";
  let statusCode = 0;

  // Get all(Scan) items
  const params = {
    TableName: "Users",
  };

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = {
      listItems : data.Items
    };
    statusCode = 200;

  } catch (err) {
    console.error(err);
    responseBody = "Error retriving list";
    statusCode = 500;
  }

  const result = {
    statusCode: statusCode,
    body: JSON.stringify(responseBody)
  };

  return result;
};

