
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
    MemoryRouter,
    Route,
    Routes,
    Link,
    matchPath,
    useLocation,
    Outlet,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';


function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/drafts">{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

export const ProfileContainerView = () => {
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/profile', '/profile/allocations']);
    const currentTab = routeMatch?.pattern?.path;

    return (
        <>
            <Tabs value={currentTab} centered sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tab label="Perfil" value="/profile" to="/profile" component={Link} />
                <Tab label="Asignaciones" value="/profile/allocations" to="/profile/allocations" component={Link} />
            </Tabs>
            <Outlet />
        </>
    );
}

