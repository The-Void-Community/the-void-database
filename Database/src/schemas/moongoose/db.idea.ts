import mongoose, { Schema } from 'mongoose';
import { mdbTypes } from '../../m.index';

interface dbIdeasAttributes {
    ideaName: string;
    username: string;
    globalname: string;
    description: string;
    guildname: string;
};

class DBIdeasAttributes {
    static ideaName: string;
    static username: string;
    static globalname: string;
    static description: string;
    static guildname: string;
};

const dbIdeasSchema = new Schema<dbIdeasAttributes>({
    ideaName: { type: mdbTypes.String, required: true },
    username: { type: mdbTypes.String, required: true },
    globalname: { type: mdbTypes.String, required: true },
    description: { type: mdbTypes.String, required: true },
    guildname: { type: mdbTypes.String, required: true }
});

const database = mongoose.model('Idea', dbIdeasSchema);

export { database, dbIdeasAttributes as ideaType, DBIdeasAttributes };