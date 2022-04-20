import { Routes, Route } from "react-router-dom";
import { PrivateLayout } from "../components/layout/PrivateLayout";
import { PublicLayout } from "../components/layout/PublicLayout";
import { LoginView } from "../components/view/Login/LoginView";
import { AboutView } from "../components/view/About/AboutView";
import { useUser } from "../hooks/useUser";
import { DashboardView } from "../components/view/Dashboard/DashboardView";
import { ItemsView } from "../components/view/Items/ItemsView";
import { BrandsView } from "../components/view/Brands/BrandsView";
import { ModelView } from "../components/view/Models/ModelView";
import { PrintersView } from "../components/view/Printers/PrintersView";
import TelephonyView from "../components/view/Telephony/TelephonyView";
import PhonelinesView from "../components/view/Phonelines/PhonelinesView";
import RadiosView from "../components/view/Radios/RadiosView";
import ConsumablesView from "../components/view/Consumables/ConsumablesView";
import { ProfileView } from "../components/view/Profile/ProfileView";
import { NotFound } from "../components/view/NotFound/NotFound";
import { AllocationsView } from "../components/view/Allocations/AllocationsView";
import { UserView } from "../components/view/Users/UserView";
import { UsersView } from "../components/view/Users/UsersView";
import { RadioModelsView } from "../components/view/RadioModels/RadioModelsView";
import { PrinterModelsView } from "../components/view/PrinterModels/PrinterModelsView";
import { ConsumableModelsView } from "../components/view/ConsumableModels/ConsumableModelsView";
import { TelephonyModelsView } from "../components/view/TelephonyModelsView/TelephonyModelsView";
import { regularMenuList, supportMenuList } from "./menuItems";
import { SinginView } from "../components/view/Singin/SinginView";
import { ProfileContainerView } from "../components/view/Profile/ProfileContainerView";
import { ProfileAllocationsView } from "../components/view/Profile/ProfileAllocationsView";
import { AllocationsContainerView } from "../components/view/Allocations/AllocationsContainerView";
import { AllocateView } from "../components/view/Allocations/AllocateView";


const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AboutView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/singin" element={<SinginView />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}

const SupportRoutes = () => {
    return (
        <Routes>

            {/* PRINCIPAL */}
            <Route path="/" element={<DashboardView />} />
            <Route path="/items/*" element={<ItemsView />} />

            {/* asignaciones */}
            <Route path="/allocations/*" element={<AllocationsContainerView />} >
                <Route index element={<AllocationsView />} />
                <Route path="assing" element={<AllocateView />} />
            </Route>


            {/*PROFILE MENU */}
            <Route path="/profile/*" element={<ProfileContainerView />}>
                <Route index element={<ProfileView />} />
                <Route path="allocations" element={<ProfileAllocationsView />} />
            </Route>

            {/* OTHERS MENU */}
            <Route path="/brands/*" element={<BrandsView />} />

            {/* DETAILD INVENTORY  */}
            <Route path="/printers/*" element={<PrintersView />} />
            <Route path="/consumables/*" element={<ConsumablesView />} />
            <Route path="/telephony/*" element={<TelephonyView />} />
            <Route path="/phonelines/*" element={<PhonelinesView />} />
            <Route path="/radios/*" element={<RadiosView />} />

            {/* USERS */}
            <Route path="users/" element={<UsersView />} >
                <Route path=":userId" element={<UserView />} />
            </Route>

            {/* MODELS */}
            <Route path="models" >

                <Route index element={<ModelView />} />
                <Route path="consumables" element={<ConsumableModelsView />} />
                <Route path="printers" element={<PrinterModelsView />} />
                <Route path="telephony" element={<TelephonyModelsView />} />
                <Route path="radios" element={<RadioModelsView />} />

            </Route>


            {/* NO FOUIND 404 */}
            <Route path="/*" element={<NotFound />} />

        </Routes>
    )
}

const RegularRoutes = () => {
    return (
        <Routes>

            {/* PRINCIPAL */}
             <Route path="/" element={<DashboardView />} />
            {/* <Route path="/allocations/*" element={<AllocationsView />} />  */}

            {/*PROFILE MENU */}
            <Route path="/profile/*" element={<ProfileContainerView />}>
                <Route index element={<ProfileView />} />
                <Route path="allocations" element={<ProfileAllocationsView />} />
            </Route>

            {/* USERS */}
            <Route path="user/" element={<UserView />} />

            {/* NO FOUIND 404 */}
            <Route path="/*" element={<NotFound />} />

        </Routes>
    )
}


export default function AppRoutes() {
    const { user } = useUser() //se verifica el usuario y se arroja el layout dependiendo de su rol
    return (
        <Routes>
            {
                (user.rol_id === undefined || user.rol_id === -1)
                    ? <Route path="/*" element={<PublicLayout children={<PublicRoutes />} />} />
                    : (user.rol_id === 2)
                        ? <Route path="/*" element={<PrivateLayout
                            children={<SupportRoutes />} menuList={supportMenuList} />}
                        />
                        : (user.rol_id === 3) && <Route path="/*" element={<PrivateLayout
                            children={<RegularRoutes />} menuList={regularMenuList} />}
                        />
            }
        </Routes>
    )
}
