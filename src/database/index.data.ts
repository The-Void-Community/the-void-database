import * as CVC from "./schemas/create-vchannels.schema";
import * as MTU from "./schemas/msg-to-user.schema";
import * as mutliplatform from "./schemas/db.mutliplatform";
import * as idea from "./schemas/idea.schema";
import * as locale from "./schemas/locale.schema";
import * as log from "./schemas/log.schema";

import init from "./m.init";

import { StatusType, DatabaseStatus } from "./types/database.types";

const database = {
  CVC: {
    database: CVC.default,
    schema: MTU.schema,
  },
  MTU: {
    database: MTU.default,
    schema: MTU.schema,
  },
  mutliplatform: {
    database: mutliplatform.default,
    schema: mutliplatform.schema,
  },
  idea: {
    database: idea.default,
    schema: idea.schema,
  },
  locale: {
    database: locale.default,
    schema: locale.schema,
  },
  log: {
    database: log.default,
    schema: log.schema,
  },
};

export default { database, init };

export { database, init, StatusType, DatabaseStatus };
