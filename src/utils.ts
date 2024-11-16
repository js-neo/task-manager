export const validateId = (input: string): boolean => {
    return !isNaN(parseFloat(input));
};
