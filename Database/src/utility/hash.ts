import { pseudoRandomNumber } from "random";

const getKey = (value: any, map: any) =>
{
    return [...map].find(([key, val]) => val == value);
};

const enabledPasswordLetters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-={}[]:;"\'"|,.<>/?~`№';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const numbers = '1234567890';
const symbols = '!@#$%^&*()_+-={}[]:;"\'"|,.<>/?~`№';
const enabledPasswordLettersHashiedA = new Map();
const enabledPasswordLettersHashiedB = new Map();
const enabledPasswordLettersHashiedC = new Map();

const getRandomString = (length: any) =>
{
    let string = '';

    for(let i = 0; i < length; i++)
        string += letters[pseudoRandomNumber(0, letters.length-1, 0, 0, undefined, undefined, undefined, false, true, true)];

    return string;
};

const hashSymbols = new Map()
    .set('Fx0dp', '1')
    .set('Fx0kz', '0')
    .set('Fx0bG', '1')
    .set('Fx0Lh', '0')
    .set('Fx0xA', '1')
    .set('Fx0JH', '0')
    .set('Fx0pQ', '1')
    .set('Fx0Zh', '0')
    .set('Fx0Jk', '1')
    .set('Fx0RP', '0');

for(let char of enabledPasswordLetters)
{
    enabledPasswordLettersHashiedA.set(char, char.codePointAt(0)?.toString(2));
    enabledPasswordLettersHashiedB.set(char.codePointAt(0)?.toString(2), char);
};

for(let array of enabledPasswordLettersHashiedB)
{
    let hashed = '';
    
    for(let i in array[0])
    {
        hashed += getKey(array[0][Number(i)], hashSymbols)[0] + getRandomString(10);
    };
    enabledPasswordLettersHashiedC.set(array[0], hashed);
};

const generateKey = (input: any) =>
{
    let key = '';

    for (var i = 0; i < input.length; i++)
        key += String.fromCharCode(pseudoRandomNumber(0, 66535, 0, 0, undefined, undefined, undefined, false, true, true));

    return key;
}

const permanentHash = (input = '') =>
{
    let first = '';
    let output = '';

    for (let i = 0; i < input.length; i++)
        first += input.charCodeAt(i).toString(3);

    for (let i = 0; i < first.length; i++)
        output += first.charCodeAt(i).toString(2);
        
    return output;
};

const hash = (input: any) =>
{
    const key = generateKey(input);
    
    let output = '';

    for (let i = 0; i < input.length; i++)
    {
    
        let inp = input.charCodeAt(i);
        let k = key.charCodeAt(i);

        output += String.fromCharCode(inp ^ k); 
    };

    return { output: output, key: key };
};

const unHash = (input = { hashedInput: '', key: '' } ) =>
{
    let output = '';

    for (let i = 0; i < input?.hashedInput?.length; i++)
    {
        let inp = input.hashedInput.charCodeAt(i);
        let k = input.key.charCodeAt(i);

        output += String.fromCharCode(inp ^ k); 
    };

    return output;
}

const checkInput = (input: any) =>
{
    let text = input.input;
    let allIsGood = true;

    for(let char of text)
        if(!enabledPasswordLettersHashiedA.get(char))
        {
            allIsGood = false
            text = text.slice(0, text.length-1);
        }

    return {
        inputIsGood: allIsGood,
        input: text,
        type: input.type
    };
};

export
{
    checkInput,
    permanentHash,
    hash,
    unHash,

    letters,
    numbers,
    symbols
}