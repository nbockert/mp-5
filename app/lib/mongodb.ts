import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};


let client;
let clientPromise: Promise<MongoClient>;


declare global {
    var _mongoPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoPromise) {
        client = new MongoClient(uri, options);
        global._mongoPromise = client.connect();
    }
    clientPromise = global._mongoPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
