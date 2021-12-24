import * as mongoose from 'mongoose';
import Henn from './henn.interface';

const HennSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter a name'],
        maxLength: 20
    },
    breed: {
        type: String,
        required: [true, 'You must enter a breed'],
        maxLength: 20
    }
});

const hennModel = mongoose.model<Henn & mongoose.Document>('henns', HennSchema);

export default hennModel;