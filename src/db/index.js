"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = connectToDb;
exports.listDatabases = listDatabases;
exports.getDb = getDb;
const mongodb_1 = require("mongodb");
const mongodb_uri_1 = require("./mongodb-uri");
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(mongodb_uri_1.uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let db;
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server
            yield client.connect();
            // Send a ping to confirm a successful connection
            yield client.db("music-app-db").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            // Assign the connected database instance to db
            db = client.db();
        }
        catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            throw error;
        }
    });
}
connectToDb().catch(console.dir);
function listDatabases(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const databasesList = yield client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    });
}
;
function getDb() {
    if (!db)
        throw new Error('DB not connected');
    return db;
}
listDatabases(client);
