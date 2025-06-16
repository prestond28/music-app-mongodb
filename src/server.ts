import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import logger from 'morgan';
const uri = "mongodb+srv://prestond28:QOdKSaaASQo8Pvag@music-app-db.wd1ffiq.mongodb.net/?retryWrites=true&w=majority&appName=music-app-db";

const app = express();
const PORT: number = 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';
const env = process.env.NODE_ENV;

// Middleware - logs server requests to console
if (env !== 'test') {
  app.use(logger(logLevel));
}

app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
})

app.listen(PORT,() => {
    console.log('The application is listening on port http://localhost:' + PORT);
})

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function listDatabases(client: MongoClient) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

listDatabases(client)
