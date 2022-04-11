import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import { MODEL } from "../../../const/routes"
import useFormFetch from '../../../hooks/useFormFetch';
import { formateerBeforeEdit, modelsAddDataFormater } from './Model';

export const ModelView = () => {

    const { getAll, post, put, deleteRow, onSetRows, rows: models, settings } = useFormFetch({ route: MODEL })

    // formateo las obciones en un objeto de tio {label:string id:number}
    const brands = settings.brands?.map(e => ({ value: e.id, label: e.name })) || [];
    const itemTypes = settings.itemTypes?.map(e => ({ value: e.id, label: e.name })) || [];

    //las columnas solo pueden tener valores unico no objetos
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'code', headerName: 'Código', width: 250, editable: true },
        {
            field: 'brand_id', headerName: 'Marca', width: 150, editable: true, type: 'singleSelect',
            valueOptions: brands,
            valueFormatter: ({ value }) => {
                const label = settings.brands?.find(e => e.id === value)
                return label.name
            }

        },
        {
            field: 'item_type_id', headerName: 'Tipo de item', width: 150,
            valueFormatter: ({ value }) => {
                const label = settings.itemTypes?.find(e => e.id === value)
                if (label?.name === undefined) return ''
                return label.name
            }
        },
        { field: 'description', headerName: 'Descripción', width: 300, editable: true },
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

    const onPost = async (data) => {
        const formatedData = modelsAddDataFormater(data)
        console.log(formatedData)
        return (await post(formatedData))
    }

    const onPut = async (data) => {
        const formatedData = modelsAddDataFormater(data)
        console.log(formatedData)
        return (await put(formatedData))
    }

    if (settings.brands && settings.itemTypes) {
        return (
            <>
                <TableTemplateContainer
                    defaultValues={{
                        // defaultValues
                        code: "",
                        brand_id: { id: -1, label: '' },
                        item_type_id: { id: -1, label: '' },
                        description: "",
                        // printer model default values
                        printer_type_id: { id: -1, label: '' },
                        print_types_id: { id: -1, label: '' },
                        consumable_id: { id: -1, label: '' },
                        // consumable model defaultvalues
                        consumable_color_id: { id: -1, label: '' },
                        consumable_type_id: { id: -1, label: '' },
                        // radios model default values
                        band_id: { id: -1, label: '' },
                        frecuency_id: { id: -1, label: '' },
                        radio_types_id: { id: -1, label: '' },
                        // telephony model default values
                        telephony_type_id: { id: -1, label: '' },
                    }}
                    modelName='Modelos'

                    fetchActions={{
                        get: getAll,
                        post: onPost,
                        put: onPut,
                        deleteRowByid: deleteRow
                    }}
                    columns={columns}
                    rows={models}
                    setRows={onSetRows}
                    Form={Form}
                    settings={settings}
                    propertyPersistance={['item_type_id']}
                    formatters={{
                        beforeEdit: formateerBeforeEdit,
                    }}

                >

                </TableTemplateContainer >

            </>
        )
    }

    return (
        <TableTemplateSkeleton />
    )
}
