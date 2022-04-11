import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { BRANDS } from '../../../const/routes';
import useFormFetch from '../../../hooks/useFormFetch';

export const BrandsView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows: brands } = useFormFetch({ route: BRANDS, fetchSettings: false })

    const columns = [
        { field: 'id', headerName: 'ID', width: 90, flex: 0.1 },
        { field: 'name', headerName: 'Marca', width: 150, flex: 0.5, editable: true },
        { field: 'website', headerName: 'Sitio Web', width: 150, flex: 0.5, editable: true },
        {
            field: 'created', headerName: 'Creado', width: 150, editable: false, flex: 0.8, type: 'date',
            valueGetter: (params) => new Date(params.value),
            valueFormatter: ({ value }) => dateTimeFormat(value),
            // editable:true
        },
        {
            field: 'modified', headerName: 'Modificado', width: 150, editable: false, flex: 0.8, type: 'date',
            valueGetter: (params) => (new Date(params.value)),
            valueParser: (params) => params.value.getFullYear(),
            valueFormatter: ({ value }) => dateTimeFormat(value)
        },
    ];

    return (
        <TableTemplateContainer
            defaultValues={{
                name: '',
                website: ''
            }}
            modelName='Marcas'

            fetchActions={{
                get: getAll,
                post: post,
                put: put,
                deleteRowByid: deleteRow
            }}
            columns={columns}
            rows={brands}
            setRows={onSetRows}
            Form={Form}
        >


        </TableTemplateContainer >
    )

}
