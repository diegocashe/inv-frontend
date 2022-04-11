import { PHONELINES } from '../../../const/routes';
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import useFormFetch from '../../../hooks/useFormFetch';

export default function PhonelinesView() {

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: PHONELINES })
    // const { operators } = settings
    const operators = (settings?.operators) ? settings.operators.map(e => ({ value: e.id, label: e.name })) : null

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'number', headerName: 'Numero de línea', width: 200, editable: true },
        {
            field: 'operator_id', headerName: 'Operadora', width: 150, editable: true, type: 'singleSelect',
            valueOptions: operators || [],
            valueFormatter: ({ value }) => {
                const selected = operators?.find(e => e.value === value)
                return selected.label
            }
        },
        { field: 'imsi', headerName: 'IMSI', width: 200, editable: true },
        { field: 'sim_card', headerName: 'Tarjeta SIM', width: 200, editable: true },
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

    if (operators) {
        return (
            <>
                <TableTemplateContainer
                    defaultValues={{
                        code: "",
                        brand_id: {},
                        item_type_id: {},
                        description: ""
                    }}
                    modelName='Líneas Telefónicas'
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
                    EnableAdd = {false}
                    EnableEdit = {false}
                    EnableErase = {false}
                >

                </TableTemplateContainer >
            </>
        )
    }

    return (
        <TableTemplateSkeleton />
    )
}
