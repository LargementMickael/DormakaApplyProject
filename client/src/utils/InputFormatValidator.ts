/**
 * Return true if the format match to the condition
*/ 
export const InputFormatValidator = (text: string): boolean => {
    return new RegExp('^[A-Za-z]{5,15}$','g').test(text);
}   