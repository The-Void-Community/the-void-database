import { database, ideaType } from '../../schemas/moongoose/db.idea';
import { statusMongoose, ErrorNotFound, ErrorNotFindType, Error, findType } from '../../m.index';

export const createIdea = async (data: ideaType): Promise<statusMongoose> =>
{
    try
    {
        const createdData = await database.create(data);

        if(!createdData)
            return {
                text: 'Произошла какая-то ошибка',
                type: 'error'
            };

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

export const getIdeaByName = async(name: string): Promise<statusMongoose> =>
{
    try
    {
        const ideas = await database.find({ideaName: name});

        if(!ideas)
            return {
                text: 'Возможно, идей не существует',
                type: 'error'
            }

        return {
            text: 'Идеи успешно найдены',
            type: 'successed',
            tag: ideas
        };
    }
    catch (err)
    {
        console.error(err);
        
        return new Error(err);
    };
};

export const getIdeaByOptions = async(options: ideaType): Promise<statusMongoose> =>
{
    try
    {
        const ideas = await database.find(options);

        if(!ideas)
            return {
                text: 'Возможно, идей не существует',
                type: 'error'
            }
    
        return {
            text: 'Идеи успешно найдены',
            type: 'successed',
            tag: ideas
        };
    }
    catch (err)
    {
        console.log(err);
        
        return new Error(err);
    };
};

export const getIdea = async(findType: findType, tagId?: string): Promise<statusMongoose> =>
{
    try
    {
        if(findType === 'findAll')
        {
            const ideas = await database.find();

            if(!ideas)
                return new ErrorNotFound('Идей нет');

            return {
                text: 'Успешно найдены идеи',
                type: 'successed',
                tag: ideas
            }
        }
        else if(findType === 'findOne')
        {
            const idea = await database.findById(tagId);

            if(!idea)
                return new Error('Идея не найдена');

            return {
                text: 'Успешно найдена идея',
                type: 'successed',
                tag: idea
            }
        }
        else return new ErrorNotFindType('Укажите findAll или findOne');
    }
    catch (err)
    {
        console.log(err);

        return new Error(err);    
    };
};