// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
  if(error) {
    return console.log('Unable to connect to DB.');
  }
  const db = client.db(databaseName);
  // db.collection('users').insertOne({
  //   name: 'New A',
  //   age: 25
  // }, (error, result) => {
  //   if(error) {
  //     return console.log('Unable to insert user');
  //   }
  //   console.log(result.ops);
  // });
  // db.collection('users').insertMany([
  //   {
  //     name: 'Kumar',
  //     age: 26
  //   },
  //   {
  //     name: 'Kaushik',
  //     age:24,
  //   }
  // ], (error, result) => {
  //   if(error) {
  //     return console.log('Unable to insert documents');
  //   }
  //   console.log(result.ops);
  // });
  // db.collection('tasks').insertMany([
  //   {
  //     completed: true,
  //     description: "Descriptoin of this task",
  //   },
  //   {
  //     completed: true,
  //     description: 'Eat Breakfast',
  //   },
  //   {
  //     completed: false,
  //     description: 'Clean House',
  //   }
  // ], (error, result) => {
  //   if(error) {
  //     return console.log('Unable to insert tasks');
  //   }
  //   console.log(result.ops);
  // });

});

