import Database from "./index.database";
import { database } from "./index.data";

import type { ICVC } from './schemas/create-vchannels.schema';
import type { IMTU } from './schemas/msg-to-user.schema';
import type { IMultiplatform } from './schemas/db.mutliplatform';
import type { IIdea } from './schemas/idea.schema';
import type { ILocale } from './schemas/locale.schema';
import type { ILog } from './schemas/log.schema';

class Models {
    private readonly _cvc = new Database<ICVC>(database.CVC.database);
    private readonly _mtu = new Database<IMTU>(database.MTU.database);
    private readonly _mutliplatform = new Database<IMultiplatform>(database.mutliplatform.database);
    private readonly _idea = new Database<IIdea>(database.idea.database);
    private readonly _locale = new Database<ILocale>(database.locale.database);
    private readonly _log = new Database<ILog>(database.log.database);

    get CVC() {
        return this._cvc;
    }

    get MTU() {
        return this._mtu;
    }

    get mutliplatform() {
        return this._mutliplatform;
    }

    get idea() {
        return this._idea;
    }

    get locale() {
        return this._locale;
    }

    get log() {
        return this._log;
    }
}

export default Models;