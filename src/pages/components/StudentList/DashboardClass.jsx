import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

const DashboardClass = (classData) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#D8ECFC",
          height: "80vh",
          width: "100%",
          margin: "auto",
          padding: "2vh 2vw",
        }}
      >
        <Grid
          sx={{
            backgroundColor: "#D8ECFC",
            height: "80vh",
            width: "100%",
            margin: "auto",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.6vh",
              marginBottom: "2vh",
            }}
          >
            Information de la classe {classData.classData.classname}
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardClass;
