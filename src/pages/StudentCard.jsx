import React from "react";
import StudentProfile from "./components/StudentCardComponents/StudentProfile";
import StudentData from "./components/StudentCardComponents/StudentData";
import { Grid, ThemeProvider } from "@mui/material";
import theme from "../theme";


const StudentCard = () => {

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
