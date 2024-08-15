import * as mIndex from './logic/mongoose/index';
import * as mSettedCreatorsVoiceChannels from './logic/mongoose/db.settedCVC';
import * as mMultiplatform from './logic/mongoose/db.multiplatform';
import * as mLog from './logic/mongoose/db.log';
import * as mIdeas from './logic/mongoose/db.idea';
import * as mMTUOJ from './logic/mongoose/db.MTUOJ';
import * as main from './m.index';
import * as locale from './logic/mongoose/db.locale';

import * as types from './types';
import * as mSchema from './schemas/moongoose';

import init from './m.init';

const mongooseDatabase =
{
    main: main,
    schema: mSchema,
    index: mIndex,
    settedCreatorsVoiceChannels: mSettedCreatorsVoiceChannels,
    multiplatform: mMultiplatform,
    locale: locale,
    log: mLog,
    ideas: mIdeas,
    MTUOJ: mMTUOJ
};

init();

export default
{
    mongooseDatabase,
    types
};