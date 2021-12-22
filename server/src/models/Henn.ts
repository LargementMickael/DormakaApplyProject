import type { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

export default class Henn {
    constructor(
        public name: string,
        public breed: string,
        public imageUrl?: string,
        public id?: ObjectId
    ){}
}

const HennSchema = new mongoose.Schema({
    name: String,
    breed: String
});

export const HennModel = mongoose.model('henns', HennSchema);