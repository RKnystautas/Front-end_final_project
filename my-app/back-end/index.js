require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} = require('mongodb');

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.listen(process.env.PORT, () => {
  console.log('Serveris paleistas...');
});

app.get('/all-users', (request, response) => {
    client.connect(async () => {
    const collection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION_NAME);
    const result = await collection.find({}).toArray();
    
    response.json(result);

    client.close();
  });
});

app.post('/new-user', (request, response) => {
  client.connect(async () => {
    const database = client.db(process.env.DB_NAME);
    const collection = database.collection(process.env.DB_COLLECTION_NAME);
    const result = await collection.insertOne({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      age: request.body.age
    });
    console.log("rezultatas : " + request.body.firstName)
    response.json(result);
    client.close();
  });
});

app.delete('/delete-user/:id', (request, response) => {
  
  client.connect(async () => {
    const database = client.db(process.env.DB_NAME);
    const collection = database.collection(process.env.DB_COLLECTION_NAME);
    
    const result = await collection.deleteOne({
      _id: ObjectId(request.params.id),
    });

    response.json(result);

    client.close();
  });
});

app.put('/all-users/:id', (request, response) => {

  client.connect(async () => {
    const database = client.db(process.env.DB_NAME);
    const collection = database.collection(process.env.DB_COLLECTION_NAME);
    const { email, age, firstName, lastName } = request.body;
    const filter = { _id: ObjectId(request.params.id) };
    console.log("name: " + firstName)
    console.log("req id: " + request.params.id)
    const newValues = {
      firstName,
      lastName,
      email,
      age: Number(age),
    }
    const result = await collection.replaceOne(filter, newValues);
    response.send([result, 'Vartotojas pakoreguotas']);

    console.log("rezultatas: " + firstName)
    client.close();
  });

});

