import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

export const NestedMenu = ({ ListIcon = InboxIcon, listName = '', ListItems = [{}] }) => {

  const [open, setOpen] = useState(false);

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

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {<ListIcon sx={{ color: 'ligth.main' }} />}
        </ListItemIcon>
        <ListItemText primary={listName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{bgcolor:'#0000009e'}}>
        <List disablePadding>
          {ListItems.map((e, i) => (
            <ListItemLink sx={{ pl: 4 }} to={e.route} key={e.route} >
              <ListItemIcon>
                <e.Icon sx={{ color: 'ligth.main' }} />
              </ListItemIcon>
              <ListItemText primary={e.name} />
            </ListItemLink>
          ))}

        </List>
      </Collapse>
    </>
  )
}
