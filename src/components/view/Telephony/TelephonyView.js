import { TELEPHONY } from '../../../const/routes';
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import useFormFetch from '../../../hooks/useFormFetch';

const TelephonyView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: TELEPHONY })

    const phoneLines = (settings?.phoneLines) ? settings.phoneLines.map(e => ({ value: e.id, label: e.number })) : null

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'imei', headerName: 'IMEI 1', width: 150, editable: true },
        { field: 'imei2', headerName: 'IMEI 2', width: 150, editable: true },
        {
            field: 'phone_line_id', headerName: 'Línea telefónica', width: 150, editable: true, type: 'singleSelect',
            valueOptions: phoneLines|| [],

            valueFormatter: ({ value }) => {
                if (value === null || value === undefined || value === -1) return 'Línea telefónica no asignada'
                const selected = phoneLines?.find(e => e.value === value)
                return selected.label
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

    if (phoneLines) {
        return (
            <>
                <TableTemplateContainer
                    modelName='Telefonía'
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

export default TelephonyView