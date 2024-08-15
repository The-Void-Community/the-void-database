import mongoose, { Schema } from 'mongoose';
import { mdbTypes } from '../../m.index';

interface settedCreatorsVoiceChannelsAttributes {
    guildId: string;
    channelId: string;
};

const settedCreatorsVoiceChannelsSchema = new Schema<settedCreatorsVoiceChannelsAttributes>({
    guildId: { type: mdbTypes.String, required: true },
    channelId: { type: mdbTypes.String, required: true }
});

const database = mongoose.model('settedCreatorsVoiceChannels', settedCreatorsVoiceChannelsSchema);

export { database, settedCreatorsVoiceChannelsAttributes };