import * as scvc from './db.settedCVC';
import * as mutliplatform from './db.mutliplatform';
import * as MTUOJ from './db.MTUOJ';
import * as logMessages from './db.log';
import * as idea from './db.idea';
import * as voidSite_voidAccount from './db.voidSite.voidAccounts';
import * as voidSite_chats from './db.voidSite.chats';
import * as voidSite_messages from './db.voidSite.messages';

export default {
    settedCreatorVoicrChannel: scvc,
    mutliplatform: mutliplatform,
    MTUOJ: MTUOJ,
    logMessages: logMessages,
    idea: idea,

    voidSite_voidAccount: voidSite_voidAccount,
    voidSite_chats: voidSite_chats,
    voidSite_messages: voidSite_messages
};