import { createIdea, getIdea, getIdeaByName } from './db.idea';
import { addLogGuild, getLogGuild, updateLogGuild } from './db.log';
import { deleteMTUOJ, getMTUOJ, setMTUOJ, updateMTUOJ } from './db.MTUOJ';
import { addMultiAccount, deleteMultiAccount, getMulitiAccount, updateMultiAccount } from './db.multiplatform';
import { addCreatorVoiceChannel, deleteCreatorVoiceChannel, getCreatorVoiceChannel, updateCreatorVoiceChannel } from './db.settedCVC';

export default
{
    getIdea, createIdea, getIdeaByName,

    addLogGuild, getLogGuild, updateLogGuild,
    
    deleteMTUOJ, getMTUOJ, setMTUOJ, updateMTUOJ,

    addMultiAccount, deleteMultiAccount, getMulitiAccount, updateMultiAccount,

    addCreatorVoiceChannel, deleteCreatorVoiceChannel, getCreatorVoiceChannel, updateCreatorVoiceChannel
};