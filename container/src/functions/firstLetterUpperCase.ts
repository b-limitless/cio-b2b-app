export const firstLetterUpperCase = (str:string | undefined) => {
    if(!str) return null;

    return `${str[0].toUpperCase()}${str.slice(1)}`;
}