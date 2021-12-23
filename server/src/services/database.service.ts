// import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

// export const collections: { henns?: mongoDB.Collection } = {};

export async function connectBD() {
    return new Promise<string>(async (resolve,reject) => {

        dotenv.config();

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