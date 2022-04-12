import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export const LinearGradientLoader = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      background: 'linear-gradient(90deg, rgba(0,120,219,1) 0%, rgba(0,138,237,1) 30%, rgba(30,167,252,1) 100%)',
      // backgroundColor: theme.palette.mode === 'light' ? 'linear-gradient(90deg, rgba(0,120,219,1) 0%, rgba(0,138,237,1) 38%, rgba(30,167,252,1) 100%)' : '#308fe8',
      // animation: 'animation: animation-ozg7p2 5.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
    },
  }));