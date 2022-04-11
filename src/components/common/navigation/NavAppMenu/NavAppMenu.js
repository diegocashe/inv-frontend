import { Box, Collapse, Stack} from "@mui/material"
import { AsideMenu } from "./Aside/AsideMenu";
import NavAppHeader from "./Header/NavAppHeader";
import { useState } from "react";
import { menuList } from "../../../../config/menuItems";

export const NavAppMenu = ({ children }) => {

    const [asideOpen, setAsideOpen] = useState(true)
    const ToggleAside = () => { setAsideOpen(!asideOpen) }

    return (
        <>
            <NavAppHeader toggleAsideMenu={ToggleAside} />
            <Stack direction={'row'} sx={{ height: ['calc(100vh - 56px)', 'calc(100vh - 64px)'], position: 'relative' }}>
                <Collapse in={asideOpen} unmountOnExit orientation="horizontal" sx={{
                    backgroundColor: 'primary.main',
                    position: ['absolute', 'static'],
                    overflow:'auto',
                    minWidth: '35%',
                    height: ['calc(100vh - 56px)', 'calc(100vh - 64px)'],
                    zIndex: 10
                }} >
                    <AsideMenu menuList={menuList} />
                </Collapse>

                <Box sx={{
                    flexGrow: 1,
                    height: '100%',
                    backgroundColor: 'primary.dark',
                    overflow: 'auto',
                }}>
                    {children}
                </Box>


            </Stack>
        </>
    )
}
