import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import { PRINTERS } from "../../../const/routes"
import useFormFetch from '../../../hooks/useFormFetch';

export const PrintersView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows: printers, settings } = useFormFetch({ route: PRINTERS })
    const { printerTypes, consumables, printType } = settings

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'printer_type_id', headerName: 'Tipo de impresora', width: 200, editable: true, type: 'singleSelect',
            valueOptions: settings.printerTypes?.map(e => ({ value: e.id, label: e.name })) || [],

            valueFormatter: ({ value }) => {
                const label = settings.printerTypes?.find(e => e.id === value)
                return label.name
            }
        },
        {
            field: 'consumable_id', headerName: 'Consumible', width: 200, editable: true, type: 'singleSelect',
            valueOptions: settings.consumables?.map(e => ({ value: e.id, label: e.name })) || [],
            valueFormatter: ({ value }) => {
                const label = settings.consumables?.find(e => e.id === value)
                return label.name
            }
        },
        {
            field: 'print_types_id', headerName: 'Tipo de impresión', width: 200, editable: true, type: 'singleSelect',
            valueOptions: settings.printType?.map(e => ({ value: e.id, label: e.name })) || [],
            valueFormatter: ({ value }) => {
                const label = settings.printType?.find(e => e.id === value)
                return label.name
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

    if (printerTypes && consumables && printType) {
        return (
            <>
                <TableTemplateContainer
                    // defaultValues={{
                    //     code: "",
                    //     brand_id: {},
                    //     item_type_id: {},
                    //     description: ""
                    // }}
                    modelName='Impresoras'
                    fetchActions={{
                        get: getAll,
                        post: post,
                        put: put,
                        deleteRowByid: deleteRow
                    }}
                    columns={columns}
                    rows={printers}
                    setRows={onSetRows}
                    Form={Form}
                    settings={settings}
                >
                </TableTemplateContainer >
            </>
        )
    }

    return (
        <TableTemplateSkeleton />
    )
}
