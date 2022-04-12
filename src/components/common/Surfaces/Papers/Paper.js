import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const StyledPaper = styled(Paper)(({ theme }) => ({
     backgroundColor: theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    // textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius: '1.5rem'
  }));