import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import { PRINTERMODELS } from "../../../const/routes"
import useFormFetch from '../../../hooks/useFormFetch';

import React from 'react'

export const PrinterModelsView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: PRINTERMODELS })

    const { models } = settings

    const printerTypes = (settings?.printerTypes) ? settings.printerTypes.map(e => ({ value: e.id, label: e.name })) : null
    const printTypes = (settings?.printTypes) ? settings.printTypes.map(e => ({ value: e.id, label: e.name })) : null
    const consumableModels = (settings?.consumableModels) ? settings.consumableModels?.map(e => ({ value: e.id, label: e.model.code })) : null

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'model_id', headerName: 'Modelo', width: 150,
            valueGetter: (params) => `${params.row.model.code || 'indeterminado'}`,
        },
        {
            field: 'printer_type_id', headerName: 'Tipo de Impresora', width: 200, editable: true, type: 'singleSelect',
            valueOptions: printerTypes || [],
            valueFormatter: ({ value }) => {
                const selected = printerTypes?.find(e => e.value === value)
                return selected.label
            }

        },
        {
            field: 'consumable_id', headerName: 'Modelo de Consumible', width: 200, editable: true, type: 'singleSelect',
            valueOptions: consumableModels || [],
            valueFormatter: ({ value }) => {
                if(value===null || value===undefined || value === -1) return 'Consumible no asignado'
                const selected = consumableModels?.find(e => e.value === value)
                return selected.label
            },
            valueGetter: (params) => params.row.consumable_id || -1,
        },
        {
            field: 'print_types_id', headerName: 'Tipo de Impresión', width: 200, editable: true, type: 'singleSelect',
            valueOptions: printTypes || [],
            valueFormatter: ({ value }) => {
                const selected = printTypes?.find(e => e.value === value)
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

    if (models && printerTypes && printTypes && consumableModels) {
        return (
            <>
                <TableTemplateContainer
                    modelName='Modelos de Impresora'
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
