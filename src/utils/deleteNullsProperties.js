export const deleteNullsProperties = (object) => {
    const resultObj = {}
    for (const key in object) {
        if (!(object[key] === undefined || object[key] === null && key !== 'id')) {
            resultObj[key] = object[key];
        }
    }
    return resultObj;
}