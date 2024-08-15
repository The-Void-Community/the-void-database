import { database, logAttributes as logMessagesType } from '../../schemas/moongoose/db.log';
import { statusMongoose as status, ErrorNotFound, ErrorNotFindType, Error, findType } from '../../m.index';

export const addLogGuild = async (data: logMessagesType): Promise<status> =>
{
    try
    {
        console.log(data);
        
        const createdData = await database.create(data);

        if(!createdData)
            return {
                text: 'Произошла какая-то ошибка',
                type: 'error'
            }

        else
            return {
                text: 'Идея успешно создана',
                type: 'successed',
                tag: createdData
            }
    }
    catch (err)
    {
        console.log(err);

        return new Error(err);
    };
};

export const getLogGuild = async (findType: findType, guildLogId?: string): Promise<status> =>
{
    try
    {
        if(findType === 'findAll')
        {
            const logGuilds = await database.find();

            return {
                text: 'Успешно найдено',
                type: 'successed',
                tag: logGuilds
            };
        }
        else if(findType === 'findOne')
        {
            const logGuild = await database.findOne({guildId: guildLogId});

            if(!logGuild)
                return new ErrorNotFound('Возможно, такой гильдии не существует');

            return {
                text: 'Успешно найдено',
                type: 'successed',
                tag: logGuild
            };
        }
        else return new ErrorNotFindType('Укажите findAll или findOne');
    }
    catch (err)
    {
        return new Error(err);    
    };
};

export const updateLogGuild = async(data: logMessagesType): Promise<status> =>
{
    try
    {
        const updatedData = await database.updateOne({guildId: data.guildId}, data);

        if(!updatedData)
            return new ErrorNotFound('Возможно, такой гильдии не существует');

        return {
            text: 'Гильдия успешно изменена',
            type: 'successed',
            updatedTag: updatedData
        };
    }
    catch (err)
    {
        console.log(err);
        
        return new Error(err);
    };
};

