import React from "react";
import StudentProfile from "./components/StudentCardComponents/StudentProfile";
import StudentData from "./components/StudentCardComponents/StudentData";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/itim";

const StudentCard = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "itim",
    },
    palette: {
      primary: {
        main: "#FFB5A7",
        dark: "#FFA08F",
        light: "#FCD5CE",
      },
      secondary: {
        light: "#757ce8",
        main: "#D8ECFC",
        dark: "#3D6787",
      },
      success: {
        main: "#A1CDF1"
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'itim';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
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
