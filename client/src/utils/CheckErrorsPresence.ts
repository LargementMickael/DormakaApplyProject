/**
 * Check the State's errors Array
 * Return true if an errorMessage is found
*/ 
export const checkErrorsPresence = (errors: {[key: string]: string}): boolean => {
    const arrayOfErrorsValues: string[] = Object.entries(errors).map(([key, val]): string => {
        return val;
    });
    return arrayOfErrorsValues.some(elem => elem !== '');
}