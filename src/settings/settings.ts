import { BitBuilder } from "fbit-field";
import { Compiler } from "fbit-field/compiler";
import { join } from "node:path";

type ISettigns<T extends any[] | readonly any[]> = Record<T[number], bigint>;

export const format = (string: string, capitalize: boolean) =>
  capitalize
    ? string.charAt(0).toUpperCase() + string.slice(1)
    : string.charAt(0).toLowerCase() + string.slice(1);

export const formatSettings = <T extends string>(
  settings: T[] | readonly T[],
) =>
  settings.map((string: T) =>
    format(
      string
        .toLowerCase()
        .replaceAll("__", " ")
        .replaceAll("_", " ")
        .split(" ")
        .map((v) => format(v, true))
        .join(""),
      false,
    ),
  );

export namespace Settings {
  export type Users = ISettigns<typeof Users.ALL>;
  export namespace Users {
    export const EXCLUDE = [] as const;

    export const ALL = [...EXCLUDE] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Users = new BitBuilder(ALL).execute(0n);
    export const AVAILABLE: Users = new BitBuilder(ALL).execute(0n, EXCLUDE);
    export const RAW_DEFAULT: bigint = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE: bigint = builder.resolve(AVAILABLE);
  }

  export type Guild = ISettigns<typeof Guild.ALL>;
  export namespace Guild {
    export const EXCLUDE = [
      "WHEN_USER__JOIN_INTO_GUILD__SEND_MESSAGE_TO_USER",
      "WHEN_USER__LEAVE_FROM_GUILD__SEND_MESSAGE_TO_USER",

      "WHEN_USER__JOIN_INTO_GUILD__SEND_HELLO_MESSAGE_TO_CHANNEL",
      "WHEN_USER__LEAVE_FROM_GUILD__SEND_GOODBYE_MESSAGE_TO_CHANNEL",

      "WHEN_USER__JOIN_INTO_GUILD__GRANT_ROLES",

      "WHEN_USER__JOIN_INTO_VOICE__CREATE_VOICE_AND_MOVE_HIM",
    ] as const;

    export const ALL = [...EXCLUDE] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Guild = builder.execute(Users.DEFAULT);
    export const AVAILABLE: Guild = builder.execute(Users.DEFAULT, EXCLUDE);
    export const RAW_DEFAULT: bigint = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE: bigint = builder.resolve(AVAILABLE);
  }

  export type Logging = ISettigns<typeof Logging.ALL>;
  export namespace Logging {
    export const EXCLUDE = [
      "WHEN_BOT__JOIN_INTO_GUILD__SEND_LOG_INTO_CHANNEL",
      "WHEN_BOT__LEAVE_FROM_GUILD__SEND_LOG_INTO_CHANNEL",

      "WHEN_USER__JOIN_INTO_GUILD__SEND_LOG_INTO_CHANNEL",
      "WHEN_USER__LEAVE_FROM_GUILD__SEND_LOG_INTO_CHANNEL",

      "WHEN_USER__JOIN_INTO_VOICE__SEND_LOG_INTO_CHANNEL",
      "WHEN_USER__LEAVE_FROM_VOICE__SEND_LOG_INTO_CHANNEL",

      "WHEN_MESSAGE__WAS_SENDED__SEND_LOG_INTO_CHANNEL",
      "WHEN_MESSAGE__WAS_CHANGED__SEND_LOG_INTO_CHANNEL",
      "WHEN_MESSAGE__WAS_DELETED__SEND_LOG_INTO_CHANNEL",

      "WHEN_USER__CHANGE_PROFILE__SEND_LOG_INTO_CHANNEL",
      "WHEN_USER__CHANGE_ACTIVITY__SEND_LOG_INTO_CHANNEL",

      "WHEN_USER__TAKES_MUTE__SEND_LOG_INTO_CHANNEL",
      "WHEN_USER__TAKES_BAN__SEND_LOG_INTO_CHANNEL",

      "WHEN_ROLES__CHANGES_AT_USER__SEND_LOG_INTO_CHANNEL",

      "WHEN_GUILD_PROFILE__CHANGES__SEND_LOG_INTO_CHANNEL",
    ] as const;

    export const ALL = [...EXCLUDE] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Logging = builder.execute(Guild.DEFAULT);
    export const AVAILABLE: Logging = builder.execute(Guild.DEFAULT, EXCLUDE);
    export const RAW_DEFAULT: bigint = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE: bigint = builder.resolve(AVAILABLE);
  }

  export type Roles = ISettigns<typeof Roles.ALL>;
  export namespace Roles {
    export const EXCLUDE = [] as const;

    export const ALL = [...EXCLUDE] as const;

    const builder = new BitBuilder(ALL);

    export const DEFAULT: Roles = builder.execute(Logging.DEFAULT);
    export const AVAILABLE: Roles = builder.execute(Logging.DEFAULT, EXCLUDE);
    export const RAW_DEFAULT: bigint = builder.resolve(DEFAULT);
    export const RAW_AVAILABLE: bigint = builder.resolve(AVAILABLE);
  }

  // ## { COMPILED__WRITE_COMPILED_HERE } ## \\

/**
 * - this file was auto genereted by compiler 
 * - if you see inconsistencies: https://github.com/FOCKUSTY/bit-field/issues 
 */
export const settings = {
  users: {} as const,

  guild: {
    /** @value 1 */
whenUserJoinIntoGuildSendMessageToUser: 1n << 0n,

    /** @value 2 */
whenUserLeaveFromGuildSendMessageToUser: 1n << 1n,

    /** @value 4 */
whenUserJoinIntoGuildSendHelloMessageToChannel: 1n << 2n,

    /** @value 8 */
whenUserLeaveFromGuildSendGoodbyeMessageToChannel: 1n << 3n,

    /** @value 16 */
whenUserJoinIntoGuildGrantRoles: 1n << 4n,

    /** @value 32 */
whenUserJoinIntoVoiceCreateVoiceAndMoveHim: 1n << 5n
  } as const,

  logging: {
    /** @value 64 */
whenBotJoinIntoGuildSendLogIntoChannel: 1n << 6n,

    /** @value 128 */
whenBotLeaveFromGuildSendLogIntoChannel: 1n << 7n,

    /** @value 256 */
whenUserJoinIntoGuildSendLogIntoChannel: 1n << 8n,

    /** @value 512 */
whenUserLeaveFromGuildSendLogIntoChannel: 1n << 9n,

    /** @value 1024 */
whenUserJoinIntoVoiceSendLogIntoChannel: 1n << 10n,

    /** @value 2048 */
whenUserLeaveFromVoiceSendLogIntoChannel: 1n << 11n,

    /** @value 4096 */
whenMessageWasSendedSendLogIntoChannel: 1n << 12n,

    /** @value 8192 */
whenMessageWasChangedSendLogIntoChannel: 1n << 13n,

    /** @value 16384 */
whenMessageWasDeletedSendLogIntoChannel: 1n << 14n,

    /** @value 32768 */
whenUserChangeProfileSendLogIntoChannel: 1n << 15n,

    /** @value 65536 */
whenUserChangeActivitySendLogIntoChannel: 1n << 16n,

    /** @value 131072 */
whenUserTakesMuteSendLogIntoChannel: 1n << 17n,

    /** @value 262144 */
whenUserTakesBanSendLogIntoChannel: 1n << 18n,

    /** @value 524288 */
whenRolesChangesAtUserSendLogIntoChannel: 1n << 19n,

    /** @value 1048576 */
whenGuildProfileChangesSendLogIntoChannel: 1n << 20n
  } as const,

  roles: {} as const
} as const;
// ## { COMPILED__WRITE_COMPILED_HERE } ## \\
  // ## { COMPILED__WRITE_VALUES_HERE } ## \\

export type IConfig = {
  users: [],
  guild: [
    when_user_join_into_guild_send_message_to_user: unknown,
    when_user_leave_from_guild_send_message_to_user: unknown,
    when_user_join_into_guild_send_hello_message_to_channel: unknown,
    when_user_leave_from_guild_send_goodbye_message_to_channel: unknown,
    when_user_join_into_guild_grant_roles: unknown,
    when_user_join_into_voice_create_voice_and_move_him: unknown
  ],
  logging: [
    when_bot_join_into_guild_send_log_into_channel: unknown,
    when_bot_leave_from_guild_send_log_into_channel: unknown,
    when_user_join_into_guild_send_log_into_channel: unknown,
    when_user_leave_from_guild_send_log_into_channel: unknown,
    when_user_join_into_voice_send_log_into_channel: unknown,
    when_user_leave_from_voice_send_log_into_channel: unknown,
    when_message_was_sended_send_log_into_channel: unknown,
    when_message_was_changed_send_log_into_channel: unknown,
    when_message_was_deleted_send_log_into_channel: unknown,
    when_user_change_profile_send_log_into_channel: unknown,
    when_user_change_activity_send_log_into_channel: unknown,
    when_user_takes_mute_send_log_into_channel: unknown,
    when_user_takes_ban_send_log_into_channel: unknown,
    when_roles_changes_at_user_send_log_into_channel: unknown,
    when_guild_profile_changes_send_log_into_channel: unknown
  ],
  roles: []
};

// ## { COMPILED__WRITE_VALUES_HERE } ## \\
  export namespace Raw {
    // ## { COMPILED__WRITE_EXPORT_HERE } ## \\

export type Keys = keyof typeof settings;
export type Settings<T extends Keys> = (typeof settings)[T];
export type SettingsKeys<T extends Keys> = keyof Settings<T>;
// ## { COMPILED__WRITE_EXPORT_HERE } ## \\
  }

  export const CONSTANTS = {
    raw: {
      default: {
        users: Users.RAW_DEFAULT,
        guild: Guild.RAW_DEFAULT,
        logging: Logging.RAW_DEFAULT,
        roles: Roles.RAW_DEFAULT,
      } as const,

      available: {
        users: Users.RAW_AVAILABLE,
        guild: Guild.RAW_AVAILABLE,
        logging: Logging.RAW_AVAILABLE,
        roles: Roles.RAW_AVAILABLE,
      } as const,
    } as const,

    object: {
      default: {
        users: Users.DEFAULT,
        guild: Guild.DEFAULT,
        logging: Logging.DEFAULT,
        roles: Roles.DEFAULT,
      } as const,

      available: {
        users: Users.AVAILABLE,
        guild: Guild.AVAILABLE,
        logging: Logging.AVAILABLE,
        roles: Roles.AVAILABLE,
      } as const,
    } as const,
  } as const;
}

if (process.env.NODE_ENV === "compile_settings") {
  const settings = Object.fromEntries(
    Object.keys(Settings.CONSTANTS.object.available).map((key) => [
      key,
      Object.keys((Settings.CONSTANTS.object.available as any)[key]),
    ]),
  );

  const typeCompiler = new Compiler(settings, join(__dirname, "settings.ts"), {
    settingsFormat(settings) {
      return settings.map((string: string) =>
        string.replaceAll("__", "_").toLocaleLowerCase(),
      );
    },
    compile(me): any {
      return Object.fromEntries(
        me.keys.map((key) => [
          key,
          me.parse(key).map((key) => `${key}: unknown`),
        ]),
      );
    },
    writeFile(me): string {
      const data = JSON.stringify(me.compile(me), undefined, 2)
        .replaceAll('"', "")
        .replaceAll("'\\n'", "\n");

      return `\nexport type IConfig = ${data};\n`;
    },
  });

  new Compiler(
    settings,
    join(__dirname, "settings.ts"),
    {},
    {
      writeInCompiler: true,
      defaultExportOn: false,
    },
  ).execute(typeCompiler.writeFile(typeCompiler));
}
