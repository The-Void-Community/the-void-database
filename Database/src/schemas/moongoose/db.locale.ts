import mongoose, { Schema } from 'mongoose';
import { mdbTypes } from '../../m.index';

type Language = 'ru' | 'en'

interface dbLanguageAttributes {
    userId: string;
    language: Language
};

const dbLanguageSchema = new Schema<dbLanguageAttributes>({
    userId: { type: mdbTypes.String, required: true, unique: true },
    language: { type: mdbTypes.String, required: false, unique: false, default: 'ru' }
});

const database = mongoose.model('Locale', dbLanguageSchema);

export { database, dbLanguageAttributes, Language };