import { RADIOS } from '../../../const/routes';
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import dateTimeFormat from "../../../utils/dateTimeFormat";
import { TableTemplateSkeleton } from '../../common/TemplateView/TableTemplate/TableTemplateSkeleton';
import useFormFetch from '../../../hooks/useFormFetch';

export default function RadiosView() {

  const { getAll, post, put, deleteRow, onSetRows, rows, settings } = useFormFetch({ route: RADIOS })
  const { radioModels, radioTypes } = settings

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'radio_types_id', headerName: 'Tipo de radio', width: 150, editable: true, type: 'singleSelect',
      valueOptions: settings.brands?.map(e => ({ value: e.id, label: e.name })) || [],

      valueFormatter: ({ value }) => {
        const label = settings.brands?.find(e => e.id === value)
        return label.name
      }
    },
    {
      field: 'radio_model_id', headerName: 'Modelo de radio', width: 150, editable: true, type: 'singleSelect',
      valueOptions: settings.itemTypes?.map(e => ({ value: e.id, label: e.name })) || [],
      valueFormatter: ({ value }) => {
        const label = settings.itemTypes?.find(e => e.id === value)
        return label.name
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

  if (radioModels && radioTypes) {
    return (
      <>
        <TableTemplateContainer
          defaultValues={{
            code: "",
            brand_id: {},
            item_type_id: {},
            description: ""
          }}
          modelName='Radios'
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
        >

          Cantidad de consumibles: {rows.lenght}
        </TableTemplateContainer >
      </>
    )
  }

  return (
    <TableTemplateSkeleton />
  )
}
