import mongoose, { Schema } from 'mongoose';
import { mdbTypes } from '../../m.index';

interface multiplatformAttributes {
    telegramId: string;
    discordId: string;

    telegramName: string;
    discordName: string;
    
    password: string;
};

class MultiplatformAttributes {
    static telegramId: string;
    static discordId: string;

    static telegramName: string;
    static discordName: string;
    
    static password: string;
};

const multiplatformSchema = new Schema<multiplatformAttributes>({
    telegramId: {type: mdbTypes.String, required: true, unique: true},
    discordId: {type: mdbTypes.String, required: true, unique: true},

    telegramName: {type: mdbTypes.String, required: true},
    discordName: {type: mdbTypes.String, required: true},
    
    password: {type: mdbTypes.String, required: true},
});

const database = mongoose.model('multiplatform', multiplatformSchema);

export
{
    multiplatformAttributes,
    database,
    MultiplatformAttributes
}