import { database, voidSite_chat as chat } from '../../schemas/moongoose/db.voidSite.chats';
import { statusMongoose as status, ErrorNotFound, ErrorNotFindType, Error, findType } from '../../m.index';

export const getChat = async (findType: findType, id: string): Promise<status> =>
{
    if(findType==='findAll')
    {
        const list = await database.find({}, ['id']) || null;
        
        if(!list)
            return new Error('Возможно, чатов не существует');

        return {
            text: 'Успешно найдено',
            type: 'successed',
            tag: list
        };
    }
    else if(findType==='findOne')
    {
        const tag = await database.findById(id) || null;
        
        if(!tag)
            return new Error('Возможно, такого чата не существует')

        return {
            text: 'Успешно найдено',
            type: 'successed',
            tag: tag
        };
    }
    else return new ErrorNotFindType('Укажите findAll или findOne');
};

export const createChat = async(chat: chat): Promise<status> =>
{
    try
    {
        const createdChat = await database.create(chat);
    
        return {
            text: `Чат ${chat.name} был добавлен`,
            type: 'successed',
            tag: createdChat
        };
    }
    catch (err)
    {
        console.error(err);
        return new Error(err);
    };
};

export const updateChat = async(chat: chat): Promise<status> =>
{
    try
    {
        if(!chat.id)
            return new Error('У Вас нет id');
        
        let response: status = {text: '', type: 'error'};

        await getChat('findOne', chat.id)
            .then(async data =>
            {
                const updatedChat = await database.updateOne({id: data.id}, chat);

                response = {type: 'successed', text: `Чат обновлен\n${chat.id}\n${chat.description}`, updatedTag: updatedChat};
            });

        return response;
    }
    catch (err)
    {
        console.log(err)
        return new Error(err);
    };
};

export const deleteChat = async(id: string): Promise<status> =>
{
    try
    {
        const deletedChat = await database.deleteOne({id: id});

        return {
            type: 'successed',
            text: 'Чат успешно удален',
            deletadTag: deletedChat
        };
    }
    catch (err)
    {
        console.log(err)
        return new Error(err);
    };
};