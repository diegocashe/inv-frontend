import { ALLOCATIONS, PHONELINES } from '../../../const/routes';
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import useFormFetch from '../../../hooks/useFormFetch';

export const AllocationsView = () => {
    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: ALLOCATIONS })
    const { operators } = settings

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'assigned_people_id', headerName: 'Asignado', width: 200, },
        { field: 'assignor_user_id', headerName: 'Asignante', width: 200 },
        { field: 'assigment_date', headerName: 'Fecha de asignación', width: 200 },
        { field: 'dispatch_date', headerName: 'Fecha de despacho', width: 200 },
        { field: 'ubication', headerName: 'Ubicación', width: 200},
        { field: 'item_id', headerName: 'item', width: 200 },

        {
            field: 'assigned_people_id', headerName: 'Asignado', width: 150, editable: true, type: 'singleSelect',
            valueOptions: settings.brands?.map(e => ({ value: e.id, label: e.name })) || [],

            valueFormatter: ({ value }) => {
                const label = operators.brands?.find(e => e.id === value)
                return label.name
            }
        },
        {
            field: 'assigment_date', headerName: 'Fecha de asignacion', width: 150, editable: false, type: 'date',
            valueGetter: (params) => new Date(params.value),
            valueFormatter: ({ value }) => dateTimeFormat(value),
        }, {
            field: 'dispatch_date', headerName: 'fecha de despacho', width: 150, editable: false, type: 'date',
            valueGetter: (params) => new Date(params.value),
            valueFormatter: ({ value }) => dateTimeFormat(value),
        }, {
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

    if (true) {
        return (
            <>
                <TableTemplateContainer
                    defaultValues={{
                        code: "",
                        brand_id: {},
                        item_type_id: {},
                        description: ""
                    }}
                    modelName='Asignaciones'
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
                    EnableAdd={false}
                    EnableEdit={false}
                    EnableErase={false}
                >

                </TableTemplateContainer >
            </>
        )
    }

    return (
        <TableTemplateSkeleton />
    )
}
