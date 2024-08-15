import mongoose, { Schema, Types } from 'mongoose';
import { mdbTypes } from '../../m.index';
import { voidSite_chat } from './db.voidSite.chats'
import { voidSite_voidAccount_message } from './db.voidSite.voidAccounts';

interface voidSite_messages {
    id?: string;

    content: string;
    
    chat: voidSite_chat;
    user: voidSite_voidAccount_message;

    createdAt: Date;
    key: string;
};

const voidSite_messagesSchema = new Schema<voidSite_messages>({
    content: { type: mdbTypes.String, required: true },
    
    chat: { type: Object, required: true },
    user: { type: Object, required: true },

    createdAt: { type: mdbTypes.Date, required: true },
    key: { type: mdbTypes.String, required: true }
});

const database = mongoose.model('voidSite_messages', voidSite_messagesSchema);

export { database, voidSite_messages };