import mongoose, { Schema } from 'mongoose';
import { mdbTypes } from '../../m.index';

interface MTUOJAttributes {
    guildId: string;
    text: string;

    isEnables: boolean;
};

class MTUOJAttributesClass {
    static guildId: string;
    static text: string;

    static isEnables: boolean;
};

const MTUOJSchema = new Schema<MTUOJAttributes>({
    guildId: mdbTypes.String,
    text: mdbTypes.String,

    isEnables: mdbTypes.Boolean
});

const database = mongoose.model('MTUOJ', MTUOJSchema);

export
{
    database,
    MTUOJAttributes,
    MTUOJAttributesClass
}