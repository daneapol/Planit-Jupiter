export const extractNumericValue = (input: string): number => {
    return Number(input.replace(/[^0-9.]/g, ''));
}