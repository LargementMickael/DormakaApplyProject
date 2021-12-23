import * as mongoose from 'mongoose';
import Henn from './henn.interface';

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

const hennModel = mongoose.model<Henn & mongoose.Document>('henns', HennSchema);

export default hennModel;