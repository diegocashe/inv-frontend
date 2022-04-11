import { CONSUMABLEMODELS } from '../../../const/routes';
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import useFormFetch from '../../../hooks/useFormFetch';

export const ConsumableModelsView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: CONSUMABLEMODELS })
    const { models } = settings

    const consumableTypes = (settings?.consumableTypes) ? settings.consumableTypes.map(e => ({ value: e.id, label: e.name })) : null;
    const consumableColors = (settings?.consumableColors) ? settings.consumableColors.map(e => ({ value: e.id, label: e.colors })) : null;

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'model_id', headerName: 'Modelo / Código', width: 250,
            valueGetter: (params) => `${params.row.model.code || 'indeterminado'}`,
        },
        {
            field: 'consumable_type_id', headerName: 'Tipo de Consumible', width: 200, editable: true, type: 'singleSelect',
            valueOptions: consumableTypes || [],
            valueFormatter: ({ value }) => {
                const selected =consumableTypes?.find(e => e.value === value)
                return selected.label
            }

        },
        {
            field: 'consumable_color_id', headerName: 'Colores de Consumible', width: 200, editable: true, type: 'singleSelect',
            valueOptions: consumableColors || [],
            valueFormatter: ({ value }) => {
                const selected = consumableColors?.find(e => e.value === value)
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

    if (models && consumableTypes && consumableColors) {
        return (
            <>
                <TableTemplateContainer
                    modelName='Modelos de consumible'
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
                    {/* Cantidad de consumibles: {rows.lenght} */}
                </TableTemplateContainer >
            </>
        )
    }

    return (
        <TableTemplateSkeleton />
    )
}