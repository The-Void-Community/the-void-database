import mongoose, { Schema } from 'mongoose';
import { mdbTypes } from '../../m.index';

interface logAttributes {
    guildId: string;

    options:
    {
        messages?:
        {
            data:
            {
                channelId: string,

                delete?: boolean,
                update?: boolean,

                enabled?: boolean
            }
        },

        users?:
        {
            data:
            {
                channelId: string,

                server?:
                {
                    exit?: boolean,
                    enter?: boolean,
                    
                    rolesUpdate?: boolean,
                }

                profile?:
                {
                    changeNickname?: boolean,
                    changeAvatar?: boolean,
                }

                moderation?:
                {
                    muted?: boolean,
                    unMuted?: boolean,
                    banned?: boolean,
                    unBanned?: boolean,

                    warns?:
                    {
                        added?: boolean,
                        cleared?: boolean
                    }               
                }

                enabled?: boolean
            }
        },

        server?:
        {
            data:
            {
                channelId: string,

                updated?: boolean,
                enabled?: boolean
            }
        },

        channels?:
        {
            data:
            {
                channelId: string,

                delete?: boolean,
                update?: boolean,

                enabled?: boolean
            }
        },

        bots?:
        {
            data:
            {
                channelId: string,

                exit?: boolean,
                enter?: boolean,

                enabled?: boolean
            }
        }
    }
};

const logSchema = new Schema<logAttributes>({
    guildId: { type: mdbTypes.String, required: true, unique: true },

    options:
    {
        messages:
        {
            data:
            {
                channelId: { type: mdbTypes.String, required: true },

                delete: { type: mdbTypes.Boolean, required: true, default: false },
                update: { type: mdbTypes.Boolean, required: true, default: false },

                enabled: { type: mdbTypes.Boolean, required: true, default: false },
            }
        },

        users:
        {
            data:
            {
                channelId: { type: mdbTypes.String, required: true },

                server:
                {
                    exit: { type: mdbTypes.Boolean, required: true, default: false },
                    enter: { type: mdbTypes.Boolean, required: true, default: false },
                    
                    rolesUpdate: { type: mdbTypes.Boolean, required: true, default: false },
                },

                profile:
                {
                    changeNickname: { type: mdbTypes.Boolean, required: true, default: false },
                    changeAvatar: { type: mdbTypes.Boolean, required: true, default: false },
                },

                moderation:
                {
                    muted: { type: mdbTypes.Boolean, required: true, default: false },
                    unMuted: { type: mdbTypes.Boolean, required: true, default: false },
                    banned: { type: mdbTypes.Boolean, required: true, default: false },
                    unBanned: { type: mdbTypes.Boolean, required: true, default: false },

                    warns:
                    {
                        added: { type: mdbTypes.Boolean, required: true, default: false },
                        cleared: { type: mdbTypes.Boolean, required: true, default: false },
                    }               
                },

                enabled: { type: mdbTypes.Boolean, required: true, default: false },
            }
        },

        server:
        {
            data:
            {
                channelId: { type: mdbTypes.String, required: true },

                updated: { type: mdbTypes.String, required: true }
            }
        },

        channels:
        {
            data:
            {
                channelId: { type: mdbTypes.String, required: true },

                delete: { type: mdbTypes.Boolean, required: true, default: false },
                update: { type: mdbTypes.Boolean, required: true, default: false },

                enabled: { type: mdbTypes.Boolean, required: true, default: false },
            }
        },

        bots:
        {
            data:
            {
                channelId: { type: mdbTypes.String, required: true },

                exit: { type: mdbTypes.Boolean, required: true, default: false },
                enter: { type: mdbTypes.Boolean, required: true, default: false },

                enabled: { type: mdbTypes.Boolean, required: true, default: false },
            }
        }
    }
});

const database = mongoose.model('log', logSchema);

export { database, logAttributes };