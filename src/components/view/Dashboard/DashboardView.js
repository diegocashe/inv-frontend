import { Box, Container, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

import { Line, Pie, Bar } from 'react-chartjs-2';

import { dataBar, dataLine, dataPie } from "./Dashboard";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Postulaciones en el tiempo',
    },
  },
};

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Relación Revisadas/Ignoradas',
    },
  },
};


export const DashboardView = () => {

  const heights = [150, 110, 150, 130, 80, 50, 90, 100, 150, 50, 80];
  const contain = [
    {
      height: 300,
      children: <Pie data={dataPie} />
    },
    {
      height: 300,
      children: <Pie data={dataPie} />
    },
    {
      height: 300,
      children: <Pie data={dataPie} />
    },

  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '1.5rem'
  }));

  return (
    <Box sx={{ padding: 4 }}>
      <Box>
        <Typography variant="h5" sx={{ color: 'background.default', mb: 0.8 }}>Dashboard</Typography>
        <Container>
          <Masonry columns={{ xs: 2, sm: 2 }} height='100%' spacing={2}>
            <Item >
              <Typography variant="h6" sx={{ color: 'text.secondary' }}> Cantidad de Items</Typography>
              <Typography variant="h3" sx={{ color: 'text.primary' }}>35</Typography>
            </Item>
            <Item >
              <Typography variant="h5" color={'text.primary'}>Inventario stadis2</Typography>
              <Line options={optionsLine} data={dataLine} />
            </Item>
            <Item>
              <Typography variant="h5" color={'text.primary'}>Inventario stadis1</Typography>
              <Pie data={dataPie} />
            </Item>

            <Item >
              <Bar options={optionsBar} data={dataBar} />
            </Item>
          </Masonry>

        </Container>

      </Box>
    </Box>
  )
}
