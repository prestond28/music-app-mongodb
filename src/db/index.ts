import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import { uri } from './mongodb-uri';


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db: Db;

export async function connectToDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("music-app-db").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Assign the connected database instance to db
    db = client.db();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
connectToDb().catch(console.dir);

export async function listDatabases(client: MongoClient) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

export function getDb(): Db {
  if (!db) throw new Error('DB not connected');
  return db;
}

listDatabases(client)