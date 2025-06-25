import Auth, { AuthSchema, AuthKeys } from "./auth.schema";
import Guild, { GuildKeys, GuildSchema } from "./guild.schema";
import User, { UserSchema, UserKeys } from "./user.schema";

const KEYS = {
  auth: AuthKeys,
  user: UserKeys,
  guild: GuildKeys
} as const;

const SCHEMAS = {
  auth: AuthSchema,
  user: UserSchema,
  guild: GuildSchema
} as const;

const MODELS = {
  Auth,
  User,
  Guild
} as const;

const DATABASE_DATA = Object.keys(KEYS) as (keyof typeof KEYS)[];

export { KEYS, SCHEMAS, MODELS, DATABASE_DATA };

export default SCHEMAS;
