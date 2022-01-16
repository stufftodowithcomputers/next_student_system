import { MongoClient } from "mongodb";

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.DB_NAME;

if(!MONGODB_URL) throw new Error('Define the MONGODB_URL enviroment variable');
if(!MONGODB_DB) throw new Error('Define the DB_NAME enivroment variable');

let cachedClient;
let cachedDb;

export async function connectToDatabase() {
    if(cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    let client = new MongoClient(MONGODB_URL, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };

}