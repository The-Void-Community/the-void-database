import * as database from './database/index';
import * as loaders from './loaders/index';

export = {
    ...database,
    ...loaders,

    database,
    loaders
};
