import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import { RADIOMODELS } from "../../../const/routes"
import useFormFetch from '../../../hooks/useFormFetch';
import { modelsAddDataFormater } from './RadioModels';

export const RadioModelsView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: RADIOMODELS })
    const { models } = settings
    const radioTypes =  (settings?.radioTypes) ? settings.radioTypes.map(e => ({ value: e.id, label: e.name })) : null;
    const radioBands =  (settings?.radioBands) ? settings.radioBands.map(e => ({ value: e.id, label: e.name })) : null;
    const radioFrecuency = (settings?.radioFrecuency) ? settings.radioFrecuency.map(e => ({ value: e.id, label: e.frequency })) : null;

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'model_id', headerName: 'Modelo', width: 150, 
            valueGetter: (params) => `${params.row.model.code || 'indeterminado'}`,
        },
        {
            field: 'radio_types_id', headerName: 'Tipo de radio', width: 150, editable: true, type: 'singleSelect',
            valueOptions: radioTypes || [],
            valueFormatter: ({ value }) => {
                const selected = radioTypes?.find(e => e.value === value)
                return selected.label
            }

        },
        {
            field: 'band_id', headerName: 'Banda', width: 200, editable: true, type: 'singleSelect',
            valueOptions: radioBands || [],

            valueFormatter: ({ value }) => {
                const selected = radioBands?.find(e => e.value === value)
                return selected.label
            }

        },
        {
            field: 'frecuency_id', headerName: 'Frecuencia', width: 200, editable: true, type: 'singleSelect',
            valueOptions: radioFrecuency || [],
            valueFormatter: ({ value }) => {
                const selected = radioFrecuency?.find(e => e.value === value)
                return selected.label
            }

        },
        {
            field: 'description', headerName: 'Descripción', width: 200,
            valueGetter: (params) => {
                const { model } = params.row
                return model.description
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

    if (models && radioTypes && radioBands && radioFrecuency) {
        return (
            <>
                <TableTemplateContainer
                    defaultValues={{
                        // defaultValues
                        code: "",
                        brand_id: -1,
                        item_type_id: -1,
                        description: "",
                        // radios model default values
                        band_id: -1,
                        frecuency_id: -1,
                        radio_types_id: -1
                    }}
                    modelName='Modelos de Radio'
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
