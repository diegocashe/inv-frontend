import { ALLOCATIONS } from '../../../const/routes';
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import useFormFetch from '../../../hooks/useFormFetch';
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { Stack, Typography } from '@mui/material';


export const AllocationsView = () => {
    dayjs.extend(relativeTime);

    const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: ALLOCATIONS })

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'assigned_people_id', headerName: 'id de Asignado', width: 120, },
        {
            field: 'assigned', headerName: 'Asignado', width: 200,
            valueFormatter: ({ value }) => {
                if (value !== undefined) {
                    const { first_name, last_name } = value
                    return `${first_name} ${last_name}`
                }
                return ''
            }
        },
        { field: 'assignor_people_id', headerName: 'id de Asignante', width: 120 },
        {
            field: 'assignor', headerName: 'Asignante', width: 200,
            valueFormatter: ({ value }) => {
                if (value !== undefined) {
                    const { first_name, last_name } = value
                    return `${first_name} ${last_name}`
                }
                return ''
            }
        },
        { field: 'ubication', headerName: 'Ubicación', width: 200 },
        { field: 'item_id', headerName: 'Id Item', width: 100 },
        {
            field: 'item', headerName: 'Item', width: 250,
            valueFormatter: ({ value }) => {
                if (value !== undefined) {
                    const { id, serial, active_code } = value
                    return `${id} - ${serial} ${active_code}`
                }
                return ''
            }
        },

        {
            field: 'assigment_date', headerName: 'Fecha de asignacion', width: 150, editable: false, type: 'date',
            valueGetter: ({ value }) => ({
                asing: (value) ? dayjs(value).format('DD/MM/YYYY') : 'error en fecha',
                relative: (value) ? dayjs(value).fromNow() : '',
            }),
            renderCell: ({ value }) => {
                const { asing, relative } = value
                return (
                    <Stack>
                        <Typography variant='body2' color='text.primary'>{asing}</Typography>
                        <Typography variant='caption' color='text.secundary'>{relative}</Typography>
                    </Stack>
                )
            },
            valueFormatter: ({ value }) => dateTimeFormat(value),
        },
        {
            field: 'dispatch_date', headerName: 'fecha de despacho', width: 150,
            valueGetter: ({ value }) => {
                return ({
                    dispatch: (value !== null) ? dayjs(value).format('DD/MM/YYYY') : 'No despachado',
                    relative: (value !== null) ? dayjs(value).fromNow() : '',
                })
            },
            renderCell: ({ value }) => {
                const { dispatch, relative } = value
                return (
                    <Stack>
                        <Typography variant='body2' color='text.primary'>{dispatch}</Typography>
                        <Typography variant='caption' color='text.secundary'>{relative}</Typography>
                    </Stack>
                )
            },
            valueFormatter: ({ value }) => dateTimeFormat(value),
        },
        {
            field: 'created', headerName: 'Creado', width: 150, editable: false, type: 'date',
            valueGetter: ({ value }) => {
                return ({
                    created: (value !== null) ? dayjs(value).format('DD/MM/YYYY') : 'No despachado',
                    relative: (value !== null) ? dayjs(value).fromNow() : '',
                })
            },
            renderCell: ({ value }) => {
                const { created, relative } = value
                return (
                    <Stack>
                        <Typography variant='body2' color='text.primary'>{created}</Typography>
                        <Typography variant='caption' color='text.secundary'>{relative}</Typography>
                    </Stack>
                )
            },
            valueFormatter: ({ value }) => dateTimeFormat(value),
        },
        {
            field: 'modified', headerName: 'Modificado', width: 150, editable: false, type: 'date',
            valueParser: (params) => params.value.getFullYear(),
            valueFormatter: ({ value }) => dateTimeFormat(value),
            valueGetter: ({ value }) => {
                return ({
                    modified: (value !== null) ? dayjs(value).format('DD/MM/YYYY') : 'No despachado',
                    relative: (value !== null) ? dayjs(value).fromNow() : '',
                })
            },
            renderCell: ({ value }) => {
                const { modified, relative } = value
                return (
                    <Stack>
                        <Typography variant='body2' color='text.primary'>{modified}</Typography>
                        <Typography variant='caption' color='text.secundary'>{relative}</Typography>
                    </Stack>
                )
            },
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
                // EnableErase={false}
                >

                </TableTemplateContainer >
            </>
        )
    }

    return (
        <TableTemplateSkeleton />
    )
}
