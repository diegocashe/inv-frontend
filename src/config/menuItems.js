import { ExpandMore, Send, Dashboard, Inventory, More, Apple, CatchingPokemon, Print, PrintTwoTone, Radio, Phone, PhoneCallback, SupervisedUserCircle } from "@mui/icons-material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const others = () => {
    const p = new Map()
    p.set('description', { name: 'Otros', Icon: More })
    p.set('items', [
        { name: 'Marcas', route: '/brands', Icon: Apple },
      
    ])
    return p
}

const models = () => {
    const p = new Map()
    p.set('description', { name: 'Detalle de Modelos', Icon: More })
    p.set('items', [
        { name: 'Impresoras', route: '/models/printers', Icon: Print },
        { name: 'Consumibles', route: '/models/consumables', Icon: PrintTwoTone },
        { name: 'Telefonía', route: '/models/telephony', Icon: PhoneCallback },
        { name: 'Radios', route: '/models/radios', Icon: Phone },
    ])
    return p
}

const detailInventory = () => {
    const p = new Map()
    p.set('description', { name: 'Inventarios detallados', Icon: More })
    p.set('items', [
        //volver a hacer el controlador
        // { name: 'Impresoras', route: '/printers', Icon: Print },
        // { name: 'Consumibles', route: '/consumables', Icon: PrintTwoTone },
        { name: 'Telefonía', route: '/telephony', Icon: Phone },
        { name: 'Lineas Telefónicas', route: '/phonelines', Icon: PhoneCallback },
        // { name: 'Radios', route: '/radios', Icon: Radio },
    ])
    return p
}

export const menuList = [
    { name: 'Dashboard', route: '/', Icon: Dashboard },
    { name: 'Inventario', route: '/items', Icon: Inventory },
    { name: 'Asignaciones', route: '/allocations', Icon: LocalShippingIcon },
    { name: 'Usuarios', route: '/users', Icon: SupervisedUserCircle },
    { name: 'Modelos', route: '/models', Icon: CatchingPokemon },
    detailInventory(),
    models(),
    others(),
]


export const regularMenuList = [

]

export const supportMenuList = [
    { name: 'Dashboard', route: '/', Icon: Dashboard },
    { name: 'Inventario', route: '/items', Icon: Inventory },
    { name: 'Asignaciones', route: '/allocations', Icon: LocalShippingIcon },
    { name: 'Usuarios', route: '/users', Icon: SupervisedUserCircle },
    { name: 'Modelos', route: '/models', Icon: CatchingPokemon },
    detailInventory(),
    models(),
    others(),
]