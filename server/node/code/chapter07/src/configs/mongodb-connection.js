
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cgh3407:<>@cluster0.kqugyjm.mongodb.net/board?retryWrites=true&w=majority&appName=Cluster0";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
}
