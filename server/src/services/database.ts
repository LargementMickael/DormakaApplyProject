import * as mongoDB from "mongodb";
import dotenv from 'dotenv';

export const collections: { notes?: mongoDB.Collection } = {};

export async function connectToDatabase(){
    
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(String(process.env.DB_CONN_STRING));
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const notesCollection: mongoDB.Collection = db.collection(String(process.env.DB_COLLECTION));

    collections.notes = notesCollection;

    console.log(`Successfully connected to collection`);
}