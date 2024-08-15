import { DeleteResult } from 'mongodb';
import mongoose, { Model, UpdateWriteOpResult } from 'mongoose';

export const mdbTypes = mongoose.SchemaTypes;

export type statusType = 'error' | 'successed';
export type findType = 'findOne' | 'findAll';

export interface status {
    id?: string;

    text: string;
    type: statusType;
    
    error?: any | undefined;
    tag?: Model<any> | string;
};

export interface statusMongoose {
    id?: string;
    
    text: string;
    type: statusType;
    
    error?: any;
    tag?: any;
    
    updatedTag?: UpdateWriteOpResult;
    deletadTag?: DeleteResult;
};

export type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

export class Error {
    readonly type: statusType = 'error';
    readonly text: string = 'Возможная ошибка на стороне сервера';

    public error: any;

    constructor(err: any)
    {
        this.error = err;
    };
};

export class ErrorNotFindType {
    readonly type: statusType = 'error';
    readonly text: string = 'Введите тип findOne или findAll, возможная ошибка на стороне сервера';

    public error: any;

    constructor(err: any)
    {
        this.error = err;
    };
}

export class ErrorNotFound {
    readonly type: statusType = 'error';
    readonly text: string = 'Не удалось найти, возможная ошибка на стороне сервера.';

    public error: any;

    constructor(err: any)
    {
        this.error = err;
    };
}

export const errorNotFound: status = {
    text: 'Не удалось найти',
    
    type: 'error',
    error: 'Не удалось найти',
    tag: undefined
};

export const errorNotFindType: status = {
    text: 'Введите тип findOne или findAll',
    
    type: 'error',
    error: 'Введите тип findOne или findAll',
    tag: undefined
};

export const deleteModel = async (name: string): Promise<statusMongoose> =>
{
    try
    {
        const data = mongoose.deleteModel(name);
        
        return {
            text: `Успешно удалена модель ${name}`,
            type: 'successed',
            tag: data
        };
    }
    catch (err)
    {
        console.log(err);

        return new Error(err); 
    };
};

export const getAllModels = async(): Promise<statusMongoose> =>
{
    try
    {
        const models: string[] = mongoose.modelNames();
        
        if(!models)
            return {
                text: 'Произошла какая-то ошибка, возможно, таблиц не существует',
                type: 'error'
            }

        return {
            text: 'Успешно найдены таблицы',
            type: 'successed',
            tag: models
        }
    }
    catch (err)
    {
        console.error(err);

        return new Error(err);
    };
};