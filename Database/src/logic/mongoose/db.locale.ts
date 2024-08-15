import { database, dbLanguageAttributes, Language } from '../../schemas/moongoose/db.locale';
import { statusMongoose, ErrorNotFound, ErrorNotFindType, Error, findType } from '../../m.index';

export const addUserLocale = async (userId: string, language: Language): Promise<statusMongoose> =>
{
    try
    {
        const createdUserLocale = await database.create({userId: userId, language: language});
        
        if(!createdUserLocale)
            return {
                text: 'Произошла какая-то ошибка',
                type: 'error'
            };
        
        return {
            text: 'Идея успешно создана',
            type: 'successed',
            tag: createdUserLocale
        };
    }
    catch (err)
    {
        console.error(err);

        return new Error(err);
    };
};

export const getUserLocale = async (userId: string): Promise<statusMongoose> =>
{
    try
    {
        const userLocale = await database.findOne({userId: userId});

        if(!userLocale)
            return {
                text: 'Возможно, такой локализации не существует',
                type: 'error'
            };

        return {
            text: 'Язык успешно добавлен',
            type: 'successed',
            tag: userLocale
        };
    }
    catch (err)
    {
        console.error(err);
        
        return new Error(err);
    };
};

export const changeUserLocale = async (userId: string, language: Language): Promise<statusMongoose> =>
{
    try
    {
        const changedUserLocale = await database.updateOne({userId: userId}, {language: language});
        
        if(!changedUserLocale)
            return {
                text: 'Произошла какая-то ошибка',
                type: 'error'
            };
        
        return {
            text: 'Язык успешно сменен',
            type: 'successed',
            updatedTag: changedUserLocale
        };
    }
    catch (err)
    {
        console.error(err);

        return new Error(err);
    };
};