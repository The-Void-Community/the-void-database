import mongoose, { Schema } from 'mongoose';
import { mdbTypes } from '../../m.index';

interface voidSite_voidAccount_message {
    id: string;
    username: string,
    nickname: string,
    avatar_url: string,
    createadAt: Date
}

interface voidSite_voidAccount extends voidSite_voidAccount_message {
    email: string,
    chats: string,
    password: string
};

const voidSite_voidAccountSchema = new Schema<voidSite_voidAccount>({
    username: { type: mdbTypes.String, required: true, unique: true },
    nickname: { type: mdbTypes.String, required: true },
    avatar_url: { type: mdbTypes.String, required: true },
    email: { type: mdbTypes.String, required: true },
    chats: { type: mdbTypes.String, required: true },
    password: { type: mdbTypes.String, required: true },
    createadAt: { type: mdbTypes.Date, required: true }
});

const database = mongoose.model('voidSite_voidAccounts', voidSite_voidAccountSchema);

export { database, voidSite_voidAccount, voidSite_voidAccount_message };