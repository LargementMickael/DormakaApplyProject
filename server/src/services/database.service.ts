// import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

// export const collections: { henns?: mongoDB.Collection } = {};

export async function connectBD() {
    return new Promise<string>(async (resolve,reject) => {

        dotenv.config();

        // if(typeof process.env.MONGO_URL !== 'string'){
        //     reject("Mongo URL is bad formatting");
        //     return;
        // }
            
        // if(typeof process.env.HENNS_COLLECTION_NAME !== 'string'){
        //     console.error("Mongo Collection Name is bad formatting");
        //     return;
        // }

        // const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URL);
        // await client.connect();

        // const db: mongoDB.Db = client.db(process.env.DB_NAME);  

        // collections.henns = db.collection(process.env.HENNS_COLLECTION_NAME);

        // console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.henns.collectionName}`);

        // resolve(`Successfully connected to database: ${db.databaseName} and collection: ${collections.henns.collectionName}`);

        const { MONGO_URL, DB_NAME } = process.env;
        console.log(`Connecting to DB at ${MONGO_URL}/${DB_NAME}`);
        mongoose.connect(process.env.MONGO_URL+"/"+process.env.DB_NAME)
        .then(() => {
            resolve('Successfully connected to database');
        })
        .catch((err) => {
            reject(err);
        })
    });
}