
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cgh3407:cgh3407@cluster0.kqugyjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    required: true,
  }
})

function makeObjModel() {
  return mongoose.model('Person', personSchema);
}

const app = require('express');
app.use(body)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log('DB CONNECTED');

    // test 데이터베이스에서 person 컬렉션 가져오기
    const collection = client.db('test').collection('person');

    // 문서 하나 추가
    await collection.insertOne({ name: 'toya', age: 30 });
    console.log('ADD DOCUMENT');

    // 문서 탐색
    const documents = await collection.find({ name: 'toya' }).toArray();
    console.log('SHOW DOCUMENT\n', documents);

    // 문서 갱신
    await collection.updateOne({ name: 'toya' }, { $set: { age: 3 }});
    console.log('UPDATE DOCUMENT');

    // 갱신된 문서 탐색
    const updatedDocuments = await collection.find({ name: 'toya' }).toArray();
    console.log('SHOW DOCUMENT', updatedDocuments);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
