import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    mode: "dark",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            borderRadius: "10px",
            width: "100%",
            "& fieldset": {
              border: `1px solid rgba(255,255,255,0.05)`,
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
