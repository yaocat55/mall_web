import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0D1117',
      paper: '#161B22',
    },
    primary: {
      main: '#58A6FF',
      light: '#79B8FF',
      dark: '#3B82F6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8B949E',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#8B949E',
    },
    divider: '#30363D',
    action: {
      hover: 'rgba(88, 166, 255, 0.08)',
      selected: 'rgba(88, 166, 255, 0.16)',
    },
  },
  typography: {
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#30363D #0D1117',
          '&::-webkit-scrollbar': {
            width: 6,
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: '#0D1117',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#30363D',
            borderRadius: 3,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: 'linear-gradient(135deg, #58A6FF 0%, #3B82F6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #79B8FF 0%, #58A6FF 100%)',
          },
        },
      },
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#161B22',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#1A1F2B',
          },
          '&:hover': {
            backgroundColor: 'rgba(88, 166, 255, 0.08) !important',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#21262D',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#1C2333',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          backgroundColor: '#21262D',
        },
      },
    },
  },
});

export default darkTheme;
