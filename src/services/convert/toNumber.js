export const toNumber = (value) => {
    const num = parseInt(value, 10);

    if (isNaN(num)) {
        return "INVALID_NUMBER";
    }

    return num;
};
