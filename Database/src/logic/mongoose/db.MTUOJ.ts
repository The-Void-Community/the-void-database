import { statusMongoose as status, ErrorNotFound, ErrorNotFindType, Error } from '../../m.index';
import { database, MTUOJAttributes } from '../../schemas/moongoose/db.MTUOJ';

export const getMTUOJ = async (guildId: string): Promise<status> =>
{
    try
    {
        const data = await database.findOne({ where: { guildid: guildId } });

        if(!data)
            return new ErrorNotFound('Возможно, такой гильдии не существует');

        return {
            text: 'Успешно найдено',
            type: 'successed',
            tag: data,
        };
    }
    catch (err)
    {
        console.error(err)

        return new Error(err);
    };
};

export const setMTUOJ = async (data: MTUOJAttributes): Promise<status> =>
{
    try
    {
        let MTUOJisExists = false;

        await getMTUOJ(data.guildId).then((gettedData: status) =>
        {
            if(gettedData?.tag && gettedData.type === 'successed' && !!gettedData?.error)
                MTUOJisExists = true;
        });

        if(MTUOJisExists)
            return {
                text: 'Такая гильдия уже записана, попробуйте удалить или обновить',
                type: 'error',
                error: 'guild is exists'
            };

        const createdMTUOJ = await database.create(data);

        return {
            text: 'Гильдия успешно добавлена !',
            type: 'successed',
            tag: createdMTUOJ
        };
    }
    catch (err)
    {
        console.error(err);

        return new Error(err)
    };
};

export const updateMTUOJ = async(data: MTUOJAttributes): Promise<status> =>
{
    try
    {
        const updatedData = await database.updateOne({guildId: data.guildId}, data);
        if(!updatedData)
            return new ErrorNotFound('Возможно, такой гильдии не существует');

        return {
            text: 'Гильдия успешно изменена !',
            type: 'successed',
            updatedTag: updatedData
        };
    }
    catch (err)
    {
        console.error(err);

        return new Error(err);
    };
};

export const deleteMTUOJ = async(guildId: string): Promise<status> =>
{
    try
    {
        const deletedData = await database.deleteOne({guildId: guildId});

        return {
            text: 'Гильдия успешно удалена !',
            type: 'successed',
            deletadTag: deletedData
        };
    }
    catch (err)
    {
        console.error(err);

        return new Error(err);
    };
};    