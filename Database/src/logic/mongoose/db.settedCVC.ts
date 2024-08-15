import { database, settedCreatorsVoiceChannelsAttributes as scvcType } from '../../schemas/moongoose/db.settedCVC';
import { statusMongoose as status, ErrorNotFound, ErrorNotFindType, Error, findType } from '../../m.index';

export const getCreatorVoiceChannel = async (findType: findType, guildId: string): Promise<status> =>
{
    try
    {
        if(findType === 'findAll')
        {
            const scvcs = await database.find();
            
            if(!scvcs)
                return new ErrorNotFound('Возможно, такой базы данных нет');
            return {
                text: 'Успешно найдено',
                type: 'successed',
                tag: scvcs
            };
        }
        
        else if(findType === 'findOne')
        {
            const scvc = await database.findOne({guildId: guildId})
            
            if(!scvc)
                return new ErrorNotFound('Возможно, такой гильдии не существует');
            
            return {
                tag: scvc,
                text: 'Успешно найдено',
                type: 'successed'
            };
        }
        
        else
            return new ErrorNotFindType('Укажите findAll или findOne');
    }
    catch (err: any)
    {
        console.log(err);

        return new Error(err);
    };
};

export const addCreatorVoiceChannel = async(data: scvcType): Promise<status> =>
{
    try
    {
        let cvcData: { text: string, type: 'successed'|'error', error: any } = { text: '', type: 'successed', error: ''};

        await getCreatorVoiceChannel('findOne', data.guildId).then((cvc: status) =>
        {
            if(cvc?.text && cvc?.type === 'successed' && !!cvc?.error)
                cvcData = {
                    text: 'Канал в такой гильдии уже существует, попробуйте удалить или обновить',
                    type: 'error',
                    error: 'Канал в такой гильдии уже существует, попробуйте удалить или обновить'
                };
        })

        if(cvcData.error === 'error')
            return cvcData;

        const cCVC = await database.create(data);

        return {
            text: `Канал ${data.channelId} в ${data.guildId} был добавлен`,
            type: 'successed',
            tag: cCVC
        }
    }
    catch (err)
    {
        console.log(err);

        return new Error(err);
    };
};

export const updateCreatorVoiceChannel = async (guildId: string, channelId: string): Promise<status> =>
{
    try
    {
        const updatedData = await database.updateOne({guildId: guildId}, {channelId: channelId});

        return {
            text: `В ${guildId} был обновлен канал!`,
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

export const deleteCreatorVoiceChannel = async (guildId: string): Promise<status> =>
{
    try
    {
        const deletedData = await database.deleteOne({guildId: guildId});

        return {
            text: `В ${guildId} был удален канал!`,
            type: 'successed',
            deletadTag: deletedData
        };
    }
    catch (err)
    {
        console.log(err);

        return new Error(err);
    };
};