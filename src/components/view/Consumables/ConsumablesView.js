import { CONSUMABLE } from '../../../const/routes';
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import useFormFetch from '../../../hooks/useFormFetch';

export default function ConsumablesView() {

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: CONSUMABLE })
    const { consumableTypes, consumableCodes} = settings


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'consumable_type_id', headerName: 'Tipo de consumible', width: 200, editable: true, type: 'singleSelect',
            valueOptions: settings.brands?.map(e => ({ value: e.id, label: e.name })) || [],

            valueFormatter: ({ value }) => {
                const label = settings.brands?.find(e => e.id === value)
                return label.name
            }
        },
        {
            field: 'consumable_code_id', headerName: 'Código de Consumible', width: 200, editable: true, type: 'singleSelect',
            valueOptions: settings.itemTypes?.map(e => ({ value: e.id, label: e.name })) || [],
            valueFormatter: ({ value }) => {
                const label = settings.itemTypes?.find(e => e.id === value)
                return label.name
            }

        },
        { field: 'quantity', headerName: 'Cantidad Disponible', width: 150, editable: true, type:'number' },
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

    if (consumableTypes && consumableCodes) {
        return (
            <>
                <TableTemplateContainer
                    defaultValues={{
                        code: "",
                        brand_id: {},
                        item_type_id: {},
                        description: ""
                    }}
                    modelName='Consumibles'
                    fetchActions={{
                        get: getAll,
                        post: post,
                        put: put,
                        deleteRowByid: deleteRow
                    }}
                    columns={columns}
                    rows={rows}
                    setRows={onSetRows}
                    Form={Form}
                    settings={settings}
                >

                    {/* Cantidad de consumibles: {rows.lenght} */}
                </TableTemplateContainer >
            </>
        )
    }

    return (
        <TableTemplateSkeleton />
    )
}
