import { database, voidSite_messages as messages } from '../../schemas/moongoose/db.voidSite.messages';
import { statusMongoose as status, ErrorNotFound, ErrorNotFindType, Error, findType } from '../../m.index';

type loadType = {
    length: number;
    skip: number,
    type: 'limit'|'skip'|'skip-length'
} 

export const loadMessage = async(data: loadType): Promise<status> =>
{
    if(data.type === 'limit')
    {
        const list = await database.find({}, ['id'], { skip: 0, limit: data.length });
        const ids = list.map(data => data['id']) || null;

        if(!ids)
            return new Error("Возможно, сообщений пока что не существует");

        return {
            text: 'Успешно найдено',
            type: 'successed',
            tag: ids
        };
    }
    else if(data.type === 'skip')
    {
        const list = await database.find({}, ['id'], { skip: data.length === 0 ? data.skip : data.length, });
        const ids = list.map(data => data['id']) || null;

        if(!ids)
            return new Error("Возможно, сообщений пока что не существует");

        return {
            text: 'Успешно найдено',
            type: 'successed',
            tag: ids
        };
    }
    else
    {
        const list = await database.find({}, ['id'], { skip: data.skip, limit: data.length });
        const ids = list.map(data => data['id']) || null;

        if(!ids)
            return new Error("Возможно, сообщений пока что не существует");

        return {
            text: 'Успешно найдено',
            type: 'successed',
            tag: ids
        };
    };
};

export const getMessage = async (findType: findType, id: string): Promise<status> =>
{
    if(findType==='findAll')
    {
        const
            tagList = await database.find({ attributes: ['id'] }),
            tagString = tagList.map(t => t['id']).join('\n') || 'Нет тегов';
        
        return {
            tag: tagString,
            text: 'Успешно найдено',
            type: 'successed'
        };
    }
    else
    {
        const tag = await database.findById(id)
        
        return {
            text: 'Успешно найдено',
            type: 'successed',
            tag: tag
        };
    };
};

export const createMessage = async (message: messages): Promise<status> =>
{
    try
    {
        const msg = await database.create(message);

        return {
            text: 'Сообщение успешно создано',
            type: 'successed',
            tag: msg
        };
    }
    catch (err)
    {
        console.error(err);
        return new Error(err);
    };
};