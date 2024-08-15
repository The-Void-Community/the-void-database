import mongoose, { Schema, Types } from 'mongoose';
import { mdbTypes } from '../../m.index';
import { voidSite_voidAccount_message } from './db.voidSite.voidAccounts'

interface voidSite_chat {
    id?: string;
    
    name: string;
    avatar_url: string;
    description: string;
    
    ownerId: string;
    ownerUsername: string;

    members: voidSite_voidAccount_message[];
};

const voidSite_chatsSchema = new Schema<voidSite_chat>({
    name: { type: mdbTypes.String, required: true },
    avatar_url: { type: mdbTypes.String, required: true },
    description: { type: mdbTypes.String, required: true },
    
    ownerId: { type: mdbTypes.String, required: true },
    ownerUsername: { type: mdbTypes.String, required: true },

    members: { type: new Types.Array<voidSite_voidAccount_message>, required: true }
});

const database = mongoose.model('voidSite_chats', voidSite_chatsSchema);

export { database, voidSite_chat };