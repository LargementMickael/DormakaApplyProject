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
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    }
});

export const HennModel = mongoose.model('henns', HennSchema);