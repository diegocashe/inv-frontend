import { Box, Collapse, Stack} from "@mui/material"
import { AsideMenu } from "./Aside/AsideMenu";
import NavAppHeader from "./Header/NavAppHeader";
import { useState } from "react";
// import { menuList } from "../../../../config/menuItems";

export const NavAppMenu = ({ children, menuList }) => {

    const [asideOpen, setAsideOpen] = useState(true)
    const ToggleAside = () => { setAsideOpen(!asideOpen) }

    return (
        <>
            <NavAppHeader toggleAsideMenu={ToggleAside} />
            <Stack direction={'row'} sx={{ height: ['calc(100vh - 56px)', 'calc(100vh - 64px)'], position: 'relative' }}>
                <Box sx={{
                    position: ['absolute', 'absolute', 'static'],
                    height: ['calc(100vh - 56px)', 'calc(100vh - 64px)'],
                    overflow:'auto',
                    backgroundColor: 'nav.aside.background',
                    color:'nav.aside.text',
                    zIndex: 10
                }} id='lololo'>
                    <Collapse in={asideOpen} orientation="horizontal" >
                        <AsideMenu menuList={menuList} sx={{width: '280px'}}/>
                    </Collapse>
                </Box>

                <Box sx={{
                    flexGrow: 1,
                    height: '100%',
                    backgroundColor: 'background.main',
                    overflow: 'auto',
                }}>
                    {children}
                </Box>
            </Stack>
        </>
    )
}
