  
'use strict';
const getItems = require('./getList');
const postTodo = require('./postItem');
const deleteTodo = require('./deleteItem');

exports.handler = async (event) => {
  console.log("**************** todo-aws-service ********************");
  console.log(event);
  let response = {
    statusCode: 0,
    body: ""
  };

  try {
    if (event.pathParameters === null) {
      if (event.httpMethod==="GET") {
        response = await getItems.getList();
      } else if (event.httpMethod==="POST") {
        response = await postTodo.postItem(event.body);
      } else {
        console.log("Error");
      }
    } else {
      // If event.pathParameters !== null
      if (event.httpMethod==="PATCH") {
        response = await postTodo.postItem(event.body);
      } else if (event.httpMethod==="DELETE") {
        response = await deleteTodo.deleteItem(event.pathParameters);
      } else {
        console.log("INDEX.js catch------ Internal Server Error");
      }
    }
  } catch (error) {
    response = {
      statusCode: 500,
      responseBody: "INDEX.js ------ Internal Server Error"
    };
  }

  return response;
};