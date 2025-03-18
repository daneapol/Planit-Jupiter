/* Strip non-numeric and non-decimal point */
export const extractNumericValue = (input: string): number => {
    return Number(input.replace(/[^0-9.]/g, ''));
}