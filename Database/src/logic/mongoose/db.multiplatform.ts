import { database, multiplatformAttributes as multiAccountType } from '../../schemas/moongoose/db.mutliplatform';
import { statusMongoose as status, ErrorNotFound, ErrorNotFindType, Error, findType } from '../../m.index';

export const getMulitiAccount = async (findType: findType, idType: 'discordId'|'telegramId', id: string): Promise<status> =>
{
    if(findType==='findAll')
    {
        const multiAccounts = await database.find();
        
        return {
            text: 'Успешно найдено',
            type: 'successed',
            tag: multiAccounts
        };
    }
    else if(findType==='findOne')
        {
            let options;
            
            if(idType === 'discordId')
                options = { discordId: id };

            else if(idType === 'telegramId')
                options = { telegramId: id };
    
            const multiAccount = await database.findOne(options);
            
            if(!multiAccount)
                return new ErrorNotFound('Возможно, аккаунта не существует');

            return {
                text: 'Успешно найдено',
                type: 'successed',
                tag: multiAccount
            };
    }

    else
        return new ErrorNotFindType('Укажите findAll или findOne');
};

export const addMultiAccount = async (data: multiAccountType): Promise<status> =>
{
    try
    {   
        let isAccountExists = false;

        await getMulitiAccount('findOne', 'discordId', data.discordId).then((account: status) =>
        {
            if(account.type === 'successed')
                isAccountExists = true;
        });

        if(isAccountExists)
            return {
                text: 'Аккаунт уже существует',
                type: 'error',
                error: 'Аккаунт уже существует'
            };

       const createdData = await database.create(data);

        const text =
        `Мульти аккаунт был добавлен. TId: ${createdData.telegramId}, DId: ${createdData.discordId}\n` +
        `TName: ${createdData.telegramName}, DName: ${createdData.discordName}\n` +
        `Пароль заскречен`;

        return {
            text: text,
            type: 'successed'
        };
    }
    catch (err)
    {
        console.log(err);

        return new Error(err);
    };
};

export const updateMultiAccount = async (data: multiAccountType): Promise<status> =>
{
    try
    {
        let isAccountExists = false;
        let response: string = 'error';

        await getMulitiAccount('findOne', 'discordId', data.discordId).then((account: status) =>
        {
            if(!!account)
                isAccountExists = true;
        });

        if(!isAccountExists)
            return {
                text: 'Аккаунт не найден',
                type: 'error',
                error: 'Аккаун не найден'
            };

        await getMulitiAccount('findOne', 'discordId', data.discordId)
            .then(async (multiAccount: any) =>
            {
                if(multiAccount.dataValues.password != data.password)
                    response = 'error';

                await database.updateOne({telegramId: data.telegramId, discordId: data.discordId}, data);

                const text = `Мульти аккаунт был обновлен. TId: ${data.telegramId}, DId: ${data.discordId}\n` +
                `TName: ${data.telegramName}, DName: ${data.discordName}\n` +
                `Пароль заскречен`;
                
                response = text;
            });

        if(response === 'error')
            return new Error('Ошибка');

        return {
            text: response,
            type: 'successed',
        };

    }
    catch (err)
    {
        console.log(err);

        return new Error(err);
    };
};

export const deleteMultiAccount = async (telegramId: string, discordId: string, password: string): Promise<status> =>
{
    try
    {
        let isAccountExists = false;
        let res: string = 'error';

        await getMulitiAccount('findOne', 'discordId', discordId).then((account: status) =>
        {
            if(account.type === 'successed')
                isAccountExists = true;
        });

        if(!isAccountExists)
            return new ErrorNotFound('Возможно, такого акканута не существует');

        await getMulitiAccount('findOne', 'discordId', discordId).then(async (multiAccount) =>
            {
                console.log(multiAccount);
                
                if(multiAccount.tag.password != password)
                    return res = 'error';

                await database.deleteOne({discordId: discordId, telegramId: telegramId});
            });

        if(res === 'error')
            return {
                text: 'Ошибка, возможно, неверный пароль',
                type: 'error',
                error: 'Возможно, неверный пароль'
            }

        return {
            text: 'Аккаунт успешно удален',
            type: 'successed'
        };
    }
    catch (err)
    {
        console.log(err)

        return new Error(err);
    };
};