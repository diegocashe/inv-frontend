import { deleteNullsProperties } from "../../../utils/deleteNullsProperties"

export const beforeEditFormater = (data = {
  "first_name": "dfasdfasd",
  "last_name": "asdfasdf",
  "email": "sdfsdf",
  "nacional_identify": "asdfasdf",
  "position_id": {
    "id": 3,
    "label": "Jefe de unidad"
  },
  "department_id": {
    "id": 1,
    "label": "SISTEMAS Y TECNOLOGÍA"
  },
  "headquarters_id": {
    "id": 1,
    "label": "MENE GRANDE"
  },
  "department_headquarter_id": {
    "id": -1,
    "label": ""
  }
}) => {
  return deleteNullsProperties({
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    nacional_identify: data.nacional_identify,
    position_id: data.position_id.id,
    department_id: data.department_id.id,
    headquarters_id: data.headquarters_id.id,
    // department_headquarter_id: data.department_headquarter_id.id
  })
}