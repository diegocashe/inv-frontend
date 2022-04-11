import React, { useState } from 'react';
import { List, ListSubheader, ListItemButton, ListItemIcon, styled, ListItemText } from "@mui/material"
import { NestedMenu } from "./NestedMenu";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

export const AsideMenu = ({ menuList }) => {
  const ListStyled = styled(List)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, //alpha(theme.palette.primary.main, 0.25),
    // color: theme.palette.ligth.main,
    color: '#f1f1f1',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    minWidth: 'fit-content',
    ...theme.typography.h5
  }))

  const ListItemBtnSty = styled(ListItemButton)(({ theme }) => ({
    color: theme.palette.ligth.main,
  }))

  function ListItemLink(props) {
    const { icon, name, to, children } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef(function Link(itemProps, ref,) {
          return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
        }),
      [to],
    );

    return (
      <li>
        <ListItemButton component={renderLink}>
          {children}
        </ListItemButton>
      </li>
    );
  }


  return (
    <ListStyled
      subheader={
        <ListSubheader sx={{ backgroundColor: 'primary.main', color: 'ligth.main' }}>
          Menu
        </ListSubheader>
      }>
      {menuList.map((e, i) => {
        if (e instanceof Map) {
          const [description, items] = [e.get('description'), e.get('items')]
          return <NestedMenu listName={description.name} ListIcon={description.Icon} ListItems={items} key={i} />
        }

        if (e instanceof Object) {
          return (
            <ListItemLink to={e.route} key={e.route}>
              <ListItemIcon>{<e.Icon sx={{ color: 'ligth.main' }} />} </ListItemIcon>
              <ListItemText primary={`${e.name}`} />
            </ListItemLink>
          )
        }
      })}
    </ListStyled>
  )

}

// const MItem = styled(MenuItem)(({ theme }) => ({
//     ...theme.typography.button,
//     color: theme.palette.ligth.main
// }))

// const AccItemCont = styled(AccordionSummary)(({ theme }) => ({
//     ...theme.typography.button,
//     color: theme.palette.ligth.main
// }))
// return (

    //     <MenuList>
    //         {menuList.map((e, i) => {
    //             if (e instanceof Map) {
    //                 const [name, items] = [e.get('name'), e.get('items')]
    //                 return (
    //                     <Accordion key={i} sx={{ backgroundColor: 'primary.main', color: 'ligth.main', boxShadow: 'none' }}>
    //                         <AccItemCont expandIcon={<ExpandMore sx={{ color: 'ligth.main' }} />}>
    //                             {name}
    //                         </AccItemCont>
    //                         <AccordionDetails>
    //                             {
    //                                 (Array.isArray(items)) && (
    //                                     items.map(element => (
    //                                         <MItem key={element.route} onClick={(event) => { navigate(element.route) }} key={element.route}>
    //                                             {element.name}
    //                                         </MItem>
    //                                     ))
    //                                 )
    //                             }
    //                         </AccordionDetails>
    //                     </Accordion>
    //                 )
    //             }
    //             if (e instanceof Object) {
    //                 return (
    //                     <MItem onClick={(event) => { navigate(e.route) }} key={e.route}>
    //                         {e.name}
    //                     </MItem>
    //                 )
    //             }
    //         })}
    //     </MenuList >)