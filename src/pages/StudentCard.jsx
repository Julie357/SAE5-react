import React from "react";
import StudentProfile from "./components/StudentCardComponents/StudentProfile";
import StudentData from "./components/StudentCardComponents/StudentData";
import { Grid } from "@mui/material";
import Itim from "./fonts/Itim-Regular.ttf";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const StudentCard = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Itim",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Itim';
            font-display: swap;
            font-weight: 400;
            src: local('Itim'), local('Itim-Regular'), url(${Itim}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{
            top: "0",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Itim",
          }}
        >
          <Grid item sx={{ height: "95vh", marginLeft: "2vw" }}>
            <StudentProfile />
          </Grid>
          <Grid item sx={{ height: "95vh", marginRight: "2vw" }}>
            <StudentData />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default StudentCard;
