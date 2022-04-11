import { useState, useEffect, useCallback, useRef, Fragment } from 'react'
import { useForm } from 'react-hook-form';
import { TableTemplate } from './TableTemplate'
import dataGridRowFormater from '../../../../utils/dataGridRowFomater';
import { ConfirmDialog } from '../../Dialogs/ConfirmDialog';
import { Dialog, DialogTitle } from '@mui/material'

export const TableTemplateContainer = ({
    defaultValues = {},
    modelName = '',
    fetchActions = {
        get: async () => { },
        post: async () => { },
        put: async () => { },
        deleteRowByid: async () => { }
    },
    columns = [{}],
    rows = [],
    setRows = () => { },
    formatters = {
        beforeEdit: data => data,
    },
    Form = <></>,
    settings = {},
    EnableAdd = true,
    EnableEdit = true,
    EnableErase = true,
    propertyPersistance = [],
    children = <></>
}) => {

    const { get, post, put, deleteRowByid } = fetchActions

    const editables = columns.map(column => ((column.editable === true) && column.field)).filter(e => e)

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({ defaultValues: defaultValues })
    const defaultDialog = {
        handler: () => { },
        isOpen: false,
        action: ''
    }
    //custom hook
    const [row, setRow] = useState({})
    const [inEdit, setInEdit] = useState(false)
    const [loadingFetch, setLoadingFetch] = useState(true)
    const [snackbar, setSnackbar] = useState(null)
    const [dialog, setDialog] = useState(defaultDialog)
    const [confirmDialog, setConfirmDialog] = useState(false)

    const rowValuePersistance = useRef({})
    const oldRowsValue = useRef([])

    // PARA LIMITAR LOS RENDER HAY QUE HACER UN SOLO ESTADO O DISMINUIR LA CANTIDAD DE ESTOS
    // POR AHORA NO LO HARE POR FLOJERA

    // START-END LOADER

    const startFetchingLoader = useCallback(() => {
        if (!loadingFetch) {
            setLoadingFetch(true)
        }
    }, [loadingFetch, setLoadingFetch])

    const endUpFetchingLoader = useCallback(() => {
        // if (loadingFetch) {
        setLoadingFetch(false)
        // }
    }, [setLoadingFetch])

    // format object object data to fetch body

    const formatDataToPost = (data = {}) => {
        const formattedData = {}
        for (const key in data) {
            if (typeof data[key] === 'object' && data[key] !== null ) {
                const element = data[key];
                formattedData[key] = element.id
            } else {
                formattedData[key] = data[key]
            }
        }
        return formattedData
    }

    /** fetching */

    const getRows = useCallback(
        async () => {
            startFetchingLoader()
            try {
                const rows = await get()
                if (Array.isArray(rows)) {
                    setRows(rows)
                    oldRowsValue.current = rows
                }
            } catch (error) {
                try {
                    setRows(oldRowsValue.current)
                } catch (error) {
                    setRows([])
                }
                console.error(error)
                setSnackbar({ children: error.message, severity: 'error' });
            } finally {
                endUpFetchingLoader()
            }
        },
        [get, setRows, startFetchingLoader, endUpFetchingLoader],
    )

    const postNewRow = useCallback(
        async (data) => {
            startFetchingLoader()
            try {
                await post(formatDataToPost(data))
                setSnackbar({ children: `${modelName} agregada`, severity: 'success' });
                await getRows()
            } catch (error) {
                console.error(error)
                setSnackbar({ children: `Error agregando ${modelName}`, severity: 'error' });
            }
            reset()
            setDialog(defaultDialog)
            endUpFetchingLoader()
        },
        [reset, endUpFetchingLoader, getRows, modelName, post, startFetchingLoader],
    )

    const putRow = useCallback(
        async (data) => {
            startFetchingLoader()
            try {
                await put(formatDataToPost(data))
                setSnackbar({ children: `${modelName} actualizada`, severity: 'success' });
                await getRows()
            } catch (error) {
                console.error(error)
                setSnackbar({ children: `Error actualizando ${modelName}`, severity: 'error' });
            } finally {
                reset()
                setDialog(defaultDialog)
                endUpFetchingLoader()
            }
        },
        [reset, endUpFetchingLoader, getRows, modelName, put, startFetchingLoader],
    )

    const deleteRow = useCallback(
        async (id) => {
            startFetchingLoader()
            try {
                await deleteRowByid(id)
                setSnackbar({ children: `${modelName} eliminada`, severity: 'error' });
                await getRows()
            } catch (error) {
                console.error(error)
                setSnackbar({ children: `Error eliminando ${modelName}`, severity: 'error' });
            } finally {
                reset()
                setConfirmDialog(false)
                endUpFetchingLoader()
            }
        },
        [reset, deleteRowByid, endUpFetchingLoader, getRows, modelName, startFetchingLoader],
    )

    const handleOnStartEditRow = (model) => {
        rowValuePersistance.current = model.row
    }

    const handleOnEditRowsModelChange = (model) => {
        const formatedModel = dataGridRowFormater(model)
        if (formatedModel) {
            setRow(formatedModel);
            return
        }
        return
    }

    const handleOnCommit = async (id) => {
        let f = true;
        for (const k in row) {
            if(row[k] !== null && rowValuePersistance.current[k] !== null){
                if (row[k].toString() !== rowValuePersistance.current[k].toString()) {
                    f = false
                }
            }
        }
        if (f) {
            setRow({})
            return
        }
        setInEdit(true)
    }

    const handlerOnSubmitEditRow = async () => {
        await putRow(row)
        setInEdit(false)
    }

    const handlerOnSubmitEdit = (data) => {
        putRow(data)
    }

    const handleOnDeclineChanges = (e) => {
        setInEdit(false)
        getRows()
        setRow({})
    }

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOnOpenAddDialog = () => {
        reset()
        setDialog({ ...dialog, handler: postNewRow, isOpen: true, action: 'Agregar' })
    }

    // VUELVO EL OBJETO PLANO
    const handleOnOpenEditDialog = () => {
        const editRow = rowValuePersistance.current;
        const idRowToEdit = rowValuePersistance.current.id;
        const rowToEdit = formatters.beforeEdit(rows.find(e => e.id === idRowToEdit))
        console.log(rowToEdit)
        if (editRow.id === undefined || editRow.id === null) {
            setSnackbar({ children: 'Por favor seleccione solo una fila', severity: 'info' });
            return
        }

        for (const key in rowToEdit) {
            // if (Object.keys(editRow[key]).includes('id')) {
            //     setValue(key, editRow[key]['id'])
            // } else {
            // }
            setValue(key, rowToEdit[key])
            console.log(key, rowToEdit[key])
        }
        setDialog({ ...dialog, handler: putRow, isOpen: true, action: 'Editar' })
    }

    const handlerOnDeleteRow = () => {
        const editRow = rowValuePersistance.current;
        if (!editRow?.id) {
            setSnackbar({ children: 'Por favor seleccione solo una fila', severity: 'info' });
            return
        }
        setConfirmDialog(true)
        // setDialog({ ...defaultDialog, deleteDialog: true })
    }

    const handleOnCloseDialog = () => {
        reset()
        setDialog(defaultDialog)
    }

    const handlerSelectionModelChange = (arrayOfSelect = [0]) => {
        if (arrayOfSelect.length === 1) {
            const obj = oldRowsValue.current.find(row => row.id === arrayOfSelect[0])
            const obj2 = {}
            for (const key in obj) {
                if (editables.includes(key) || key === 'id' || propertyPersistance.includes(key)) {
                    obj2[key] = obj[key]
                }
            }
            rowValuePersistance.current = obj2
            return
        }
        rowValuePersistance.current = null
    }

    useEffect(() => {
        getRows()
        return () => {
            setRow({})
        }
    }, [])

    return (
        <TableTemplate

            Title={modelName}
            columns={columns}
            rows={rows}

            onEdit={inEdit}
            loadingFetch={loadingFetch}

            onRowEditStart={handleOnStartEditRow}
            onEditRowsModelChange={handleOnEditRowsModelChange}
            onRowEditCommit={handleOnCommit}
            onCloseSnackBar={handleCloseSnackbar}
            onDeclineChanges={handleOnDeclineChanges}
            onAcceptChanges={handlerOnSubmitEditRow}
            onOpenEditDialog={handleOnOpenEditDialog}
            onDeleteRow={handlerOnDeleteRow}

            snackbar={snackbar}

            onOpenAddRowDialog={handleOnOpenAddDialog}
            onCloseDialog={handleOnCloseDialog}

            onSelectionModelChange={handlerSelectionModelChange}
            selectionModel={row}
            EnableAdd={EnableAdd}
            EnableEdit={EnableEdit}
            EnableErase={EnableErase}

        // dialog={}
        >

            <Dialog open={dialog.isOpen} display='flex' >
                <DialogTitle>{dialog.action}</DialogTitle>
                <Form
                    onSubmit={handleSubmit(dialog.handler)}
                    settings={settings}
                    control={control}
                    errors={errors}
                    onCloseDialog={handleOnCloseDialog}
                    isLoading={loadingFetch}
                />
            </Dialog>

            <ConfirmDialog
                title='Eliminar'
                content='¿Esta seguro de continuar?'
                onAccept={(e) => {
                    deleteRow(rowValuePersistance.current.id)
                }}
                onCancel={(e) => {
                    setConfirmDialog(false)
                }}
                open={confirmDialog}
                loading={loadingFetch}
                dialogContainer
            />

            {children}
        </TableTemplate>

    )
}
