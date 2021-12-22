import * as mongoose from 'mongoose';
import Henn from './henn.interface';

const HennSchema = new mongoose.Schema({
    name: String,
    breed: String
});

const hennModel = mongoose.model<Henn & mongoose.Document>('henns', HennSchema);

export default hennModel;