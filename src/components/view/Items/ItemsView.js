import useFormFetch from '../../../hooks/useFormFetch'
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { ITEMS } from '../../../const/routes'
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import { Form } from './Form';
import { itemFormateerBeforeEdit, itemFormater } from './Items';

export const ItemsView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: ITEMS })

    const models = (settings?.models) ? settings.models.map(e => ({ value: e.id, label: e.code })) : null;
    const itemTypes = (settings?.itemTypes) ? settings.itemTypes.map(e => ({ value: e.id, label: e.name })) : null;
    const states = (settings?.states) ? settings.states.map(e => ({ value: e.id, label: e.name })) : null;
    const status = (settings?.status) ? settings.status.map(e => ({ value: e.id, label: e.name })) : null;

    const formateed = async (data) => {
        const item = itemFormater(data)
        const result = await post(item)
        return result
    }

    const onPost = async (data) => {
        const item = itemFormater(data)
        const result = await post(item)
        return result
    }

    const onPut = async (data) => {
        const item = itemFormater(data)
        const result = await put(item)
        return result
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'model_id', headerName: 'Modelo', width: 150,
            valueGetter: (params) => `${params.row.model.code || 'indeterminado'}`,
        },
        { field: 'serial', headerName: 'Serial', width: 150, editable: true },
        { field: 'active_code', headerName: 'Codigo de Activo', width: 150, editable: true },
        {
            field: 'state_id', headerName: 'Estado', width: 150, editable: true, type: 'singleSelect',
            valueOptions: states || [],
            valueFormatter: ({ value }) => {
                const selected = states?.find(e => e.value === value)
                return selected.label
            }
        },
        {
            field: 'allocations', headerName: 'Estatus', width: 200, type: 'singleSelect',
            // valueOptions: settings.status?.map(e => ({ value: e.id, label: e.name })) || [],
            valueFormatter: (allocations) => {
                const label = (Array.isArray(allocations) && allocations.length !== 0) ? 'ASIGNADO' : 'NO ASIGNADO'
                return label
            }
        },
        {
            field: 'created', headerName: 'Creado', width: 150, editable: false, type: 'date',
            valueGetter: (params) => new Date(params.value),
            valueFormatter: ({ value }) => dateTimeFormat(value),
        },
        {
            field: 'modified', headerName: 'Modificado', width: 150, editable: false, type: 'date',
            valueGetter: (params) => (new Date(params.value)),
            valueParser: (params) => params.value.getFullYear(),
            valueFormatter: ({ value }) => dateTimeFormat(value)
        },
    ];

    if (models && itemTypes && states && status) {
        return (
            <TableTemplateContainer
                defaultValues={{
                    item_type_id: { id: -1, label: '' },
                    brand_id: { id: -1, label: '' },
                    active_code: "",
                    description: "",
                    serial: "",
                    model_id: { id: -1, label: '' },
                    state_id: { id: -1, label: '' },
                    status_id: { id: -1, label: '' },

                    //phoneline 
                    operator_id: { id: -1, label: '' },
                    number: '',
                    sim_card: '',
                    imsi: '',

                    // telephony
                    phone_line_id: { id: -1, label: '' },
                    imei: '',
                    imei2: '',
                }}
                modelName='Inventario General'

                fetchActions={{
                    get: getAll,
                    post: onPost,
                    put: onPut,
                    deleteRowByid: deleteRow
                }}
                columns={columns}
                rows={rows}
                setRows={onSetRows}
                Form={Form}
                settings={settings}
                formatters={{
                    beforeEdit: itemFormateerBeforeEdit,
                }}
            >

            </TableTemplateContainer >
        )
    }

    return (
        <TableTemplateSkeleton />
    )
}
