
export const dataPie = {
    labels: ['Not responce', 'Process', 'Good'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


export const dataLine = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Postulaciones',
            data: [14, 21, 1, 36, 5, 9, 75, 4, 23, 25],
            borderColor: '#fdbb06',
            backgroundColor: '#fdbb06',
        }
    ],
};

export const dataBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Negativas',
        data: [4,5,7,3,9,2,8],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Positivas',
        data:[4,3,12,5,7,15,9],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  