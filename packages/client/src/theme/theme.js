import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: 'rgb(5,24,52)',
    },
    secondary: {
      main: 'rgb(109,177,244)',
    },
    text: {
      primary: 'rgb(11,37,70)',
      secondary: 'rgb(109,177,244)',
      light: '#fff',
    },
    background: {
      default: '#000',
      secondary: 'fff',
    },
  },
});

export { theme };
