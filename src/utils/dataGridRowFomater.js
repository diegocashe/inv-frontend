export default function dataGridRowFormater( model = {} ){
    if (Object.keys(model).length !== 0) {
        const object = {};
        for (const key in model) {
            const obj = model[key]
            object.id = key
            for (const k in obj) {
                object[k] = obj[k]['value']
            }
        }
        return object
    }
    return null
}