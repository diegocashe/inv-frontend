export const itemFormater = (data) => {
    const type = data.item_type_id
    const item = {
        item_type_id: data.item_type_id,
        serial: data.serial,
        active_code: data.active_code,
        model_id: data.model_id,
        state_id: data.state_id,
        description: data.description
    };
    if (type === 3) {
        item.telephony = {
            imei: data.imei,
            imei2: data.imei2,
            phone_line_id: data.phone_line_id
        };
    }
    if (type == 4) {
        item.phoneline = {
            operator_id: data.operator_id,
            number: data.number,
            sim_card: data.sim_card,
            imsi: data.imsi
        }
    }
    return item;
}

export const itemFormateerBeforeEdit = (data) => {
    const type = data.model.item_type_id
    const item = {
        id: data.id,
        serial: data.serial,
        active_code: data.active_code,

        model_id: { id: data.model.id, label: data.model.code },
        state_id: { id: data.state.id, label: data.state.name }
    };

    if (type === 3) {

        const { telephony: {
            imei, imei2, phone_line
        } } = data

        // telephony = {
        item.imei = imei
        item.imei2 = imei2
        item.phone_line_id = {
            id: (phone_line !== undefined) ? phone_line.id : -1,
            label: (phone_line !== undefined) ? phone_line.number : ''
        }
    }
    if (type == 4) {
        const {
            phone_line: {
                operator
            }
        } = data


        item.operator_id = { id: operator.id, label: operator.name };
        item.number = data.phone_line.number;
        item.sim_card = data.phone_line.sim_card;
        item.imsi = data.phone_line.imsi
    }
    return item;
}