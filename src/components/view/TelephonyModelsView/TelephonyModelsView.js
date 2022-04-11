import { TELEPHONYMODELS } from '../../../const/routes';
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import useFormFetch from '../../../hooks/useFormFetch';


export const TelephonyModelsView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: TELEPHONYMODELS })
    const { models } = settings

    const telephonyTypes = (settings?.telephonyTypes) ? settings.telephonyTypes.map(e => ({ value: e.id, label: e.name })) : null;

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'model_id', headerName: 'Modelo', width: 150, 
            valueGetter: (params) => `${params.row.model.code || 'indeterminado'}`,
        },
        {
            field: 'telephony_type_id', headerName: 'Tipo de telefonía', width: 150, editable: true, type: 'singleSelect',
            valueOptions: telephonyTypes|| [],
            valueFormatter: ({ value }) => {
                const selected = telephonyTypes?.find(e => e.value === value)
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

    if (telephonyTypes && models) {
        return (
            <>
                <TableTemplateContainer

                    modelName='Modelos de telefonía'
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
