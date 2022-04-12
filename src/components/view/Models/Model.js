import { SERVER_DIR } from "../../../const/ServerUrl"
import { MODEL } from "../../../const/routes"
import { deleteNullsProperties } from "../../../utils/deleteNullsProperties"

const MODEL_URL = `${SERVER_DIR}/api/${MODEL}`



export const modelsAddDataFormater = function (model) {
    console.log(model)
    // 1 -- impresora, 2 -- consumible, 3 -- telefonía, 4 -- linea telefonica (deprecated), 5 -- radios
    const type = model.item_type_id;
    const preliminarModel = {
        code: model.code,
        brand_id: model.brand_id,
        item_type_id: model.item_type_id,
        description: model.description
    }
    const formatedModel = deleteNullsProperties(preliminarModel)
    if (model['id'] && model['id'] !== undefined) formatedModel.id = model.id;
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
        formatedModel[subTypeName] = deleteNullsProperties(typeDetails)
    }
    console.log(formatedModel)
    return formatedModel
}

export const formateerBeforeEdit = function (object) {
    const formatedObj = {
        id: object.id,
        code: object.code,
        description: object.description,
        created: object.created,
        modified: object.modified,
        item_type_id: { id: object.item_type.id, label: object.item_type.name },
        brand_id: { id: object.brand.id, label: object.brand.name }
    }

    // 1 -- impresora, 2 -- consumible, 3 -- telefonía, 5 -- radios

    if (object.item_type.id === 1) {

        const { printer_model: {
            printer_type, print_type, consumable_model
        } } = object
        console.log(object)

        formatedObj.print_types_id = {
            id: print_type.id,
            label: print_type.name,
        }
        formatedObj.printer_type_id = {
            id: printer_type.id,
            label: printer_type.name,
        }
        formatedObj.consumable_id = {
            id: (consumable_model !== undefined) ? consumable_model.id : -1,
            label: (consumable_model !== undefined) ? consumable_model.model.code : '',
        }
    }

    if (object.item_type.id === 2) {
        formatedObj.consumable_color_id = {
            id: object.consumable_model.consumable_color.id,
            label: object.consumable_model.consumable_color.colors
        }
        formatedObj.consumable_type_id = {
            id: object.consumable_model.consumable_type.id,
            label: object.consumable_model.consumable_type.name
        }
    }

    if (object.item_type.id === 3) {
        formatedObj.telephony_type_id = {
            id: object.telephony_model.telephony_type.id,
            label: object.telephony_model.telephony_type.name
        }
    }
    if (object.item_type.id === 5) {

        const { radio_model: {
            radio_band, radio_frequency, radio_type } } = object

        formatedObj.band_id = { id: radio_band.id, label: radio_band.name }
        formatedObj.frecuency_id = { id: radio_frequency.id, label: radio_frequency.frequency }
        formatedObj.radio_types_id = { id: radio_type.id, label: radio_type.name }
    }
    return formatedObj
}



export const formatToEdit = function (object) {
    const a = {
        "id": 1,
        "code": "AOC 270001",
        "brand_id": 3,
        "item_type_id": 9,
        "description": "monitor de 26\""
    }
    return {
        id: object.id,
        code: object.code,
        description: object.description,
        created: object.created,
        modified: object.modified,
        item_type_id: object.item_type_id,
        brand_id: object.brand_id,
        brand: { id: object.brand.id, label: object.brand.name },
        itemType: { id: object.item_type.id, label: object.item_type.name },
    }
}


// {
//     "id": 2,
//     "code": "Q7R45",
//     "description": "Descripción modificada en línea",
//     "created": "2022-04-07T18:35:27+00:00",
//     "modified": "2022-04-07T18:48:25+00:00",
//     "item_type_id": 2,
//     "brand_id": 3,
//     "brand": {
//       "id": 3,
//       "label": "Apple"
//     },
//     "itemType": {
//       "id": 2,
//       "label": "CONSUMIBLE"
//     }
//   }