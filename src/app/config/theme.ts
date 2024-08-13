import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    mode: "dark",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            borderRadius: "10px",
            width: "100%",
            "& fieldset": {
              border: `1px solid rgba(255,255,255,0)`,
              transition: "border .15s",
            },
            "&.Mui-disabled fieldset": {
              border: `1px solid rgba(255,255,255,0)`,
              transition: "border .15s",
            },
            "&:hover fieldset": {
              border: `1px solid rgba(255,255,255,0.4)`,
            },
            "&.Mui-focused fieldset": {
              border: `1px solid rgba(255,255,255,0.4)`,
            },
          },
        },
      },
    },
  },
});
