export const radioModelsAddDataFormater = function (model) {
    // 1 -- impresora, 2 -- consumible, 3 -- telefonía, 4 -- linea telefonica (deprecated), 5 -- radios
    const type = model.item_type_id;
    const formatedModel = {
        code: model.code,
        brand_id: model.brand_id,
        item_type_id: model.item_type_id,
        description: model.description
    }
    let typeDetails = null;
    let subTypeName = '';

    if (type < 0) throw new Error('Invalid item type')

    if (type === 1) {
        typeDetails = {
            printer_type_id: model.printer_type_id,
            print_types_id: model.print_types_id,
            consumable_id: model.consumable_id,
        };
        subTypeName = 'printerDetails';
    }
    if (type === 2) {
        typeDetails = {
            consumable_color_id: model.consumable_color_id,
            consumable_type_id: model.consumable_type_id,
        };
        subTypeName = 'consumableDetails';
    }
    if (type === 3) {
        typeDetails = {
            telephony_type_id: model.telephony_type_id,
        };
        subTypeName = 'telephonyDetails';
    }
    if (type == 5) {
        typeDetails = {
            band_id: model.band_id,
            frecuency_id: model.frecuency_id,
            radio_types_id: model.radio_types_id,
        };
        subTypeName = 'radioDetails';
    }
    if ([1, 2, 3, 5].includes(type) && typeDetails && subTypeName !== '') {
        formatedModel[subTypeName] = typeDetails
    }
    return formatedModel
}