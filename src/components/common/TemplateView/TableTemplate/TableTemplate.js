import { Add, Delete, Edit } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab';
import {
    Typography,
    Box,
    Stack,
    ButtonGroup,
    Button,
    Card,
    Container,
    Alert,
    Collapse,
    Tooltip,
    Snackbar,
    Dialog,
    DialogTitle,
} from '@mui/material'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'

import { useState } from 'react'

const columnsExample = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rowsExample = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const TableTemplate = ({
    children,
    Title = 'General Items',
    columns = columnsExample,
    rows = rowsExample,
    onEdit = false,
    snackbar = null, // || { children: 'User successfully saved', severity: 'success' },
    onRowEditStart = () => { },
    onEditRowsModelChange = () => { },
    onRowEditCommit = () => { },
    onAcceptChanges = () => { },
    onDeclineChanges = () => { },
    onCloseSnackBar = () => { },
    onOpenAddRowDialog = () => { },
    onOpenEditDialog = () => { },
    onSelectionModelChange = () => { },
    onDeleteRow = () => { },
    loadingFetch = true,
    dialog = <></>,
    EnableAdd = true,
    EnableEdit = true,
    EnableErase = true,
}) => {

    const [pageSize, setPageSize] = useState(100)

    return (
        <Box sx={{ padding: '2rem' }}>
            <Stack direction='row'>
                <Stack flexGrow={1}>
                    <Stack direction={'row'} justifyContent='space-between' mb={2}>
                        <Typography variant='h5' color={'#f1f1f1'}>{Title}</Typography>
                        <ButtonGroup>
                           { (EnableAdd) && 
                            <Tooltip title='Agregar' arrow >
                                <Button color='secondary' variant='contained' disabled={!EnableAdd} onClick={onOpenAddRowDialog}><Add /></Button>
                            </Tooltip>}
                            { (EnableEdit)&&
                            <Tooltip title='Editar' arrow>
                                <Button color='info' variant='contained' disabled={!EnableEdit} onClick={onOpenEditDialog}><Edit /> </Button>
                            </Tooltip>}
                            {(EnableErase)&&
                            <Tooltip title='Eliminar' arrow>
                                <Button color='error' variant='contained' disabled={!EnableErase} onClick={onDeleteRow}><Delete /> </Button>
                            </Tooltip>}
                        </ButtonGroup>
                    </Stack>

                    <Collapse in={onEdit} >
                        <Container>
                            <Alert severity="info" sx={{ marginBottom: 1 }}
                                action={
                                    <Stack gap={2} direction='row'>
                                        <Button onClick={onDeclineChanges}>No, Cancelar</Button>
                                        <LoadingButton
                                            loading={loadingFetch}
                                            endIcon={<Edit />}
                                            onClick={onAcceptChanges}
                                            loadingPosition="end"
                                            variant="contained"
                                        >Si, Aceptar</LoadingButton>
                                        {/* <IconButton onClick={onCancelEdit}><Close /></IconButton> */}
                                    </Stack>}
                            >
                                ¿Esta seguro de editar los valores?
                            </Alert>
                        </Container>
                    </Collapse>

                    <Stack justifyContent='center' alignItems='center' p='8px'>
                        <Card sx={{
                            display: 'flex',
                            height: ['calc(100vh - 220px)'],
                            width: '100%',
                            '& .MuiDataGrid-cell--editable': {
                                bgcolor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#376331' : '#E2EEFD',
                            },
                        }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                //pagination
                                pageSize={pageSize}
                                rowsPerPageOptions={[5, 10, 20, 100]}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                pagination

                                checkboxSelection
                                disableSelectionOnClick

                                components={{
                                    Toolbar: GridToolbar
                                }}
                                loading={loadingFetch}

                                editMode='row'
                                onEditRowsModelChange={onEditRowsModelChange}
                                onRowEditCommit={onRowEditCommit}
                                onRowEditStart={onRowEditStart}

                                onSelectionModelChange={onSelectionModelChange}

                                localeText={{
                                    ...esES.components.MuiDataGrid.defaultProps.localeText,
                                    noRowsLabel: 'Sin Contenido 📭',
                                    toolbarExportPrint: 'Imprimir'
                                }}
                            />
                        </Card>
                    </Stack>

                    <Snackbar open={!!snackbar} autoHideDuration={6000} onClose={onCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Alert {...snackbar} onClose={onCloseSnackBar} />
                    </Snackbar>
                </Stack>
            </Stack>
            <Container>
                {children}
            </Container>
        </Box>
    )
}
