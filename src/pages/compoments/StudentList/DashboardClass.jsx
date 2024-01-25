import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Chip, Grid } from "@mui/material";
import FilterForm from "../ClassesListComponents/FilterForm";
import RecurrentErrors from "./RecurrentErrors";

const DashboardClass = ({ classData }) => {
  const totalStudents = classData.studentOfClassById.length;
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#D8ECFC",
          height: "95vh",
          width: "100%",
          margin: "auto",
          padding: "2vh 2vw",
        }}
      >
        <Grid
          sx={{
            backgroundColor: "#D8ECFC",
            height: "100%",
            width: "100%",
            margin: "auto",
          }}
        >
          <Typography
            fontWeight="bolder"
            sx={{
              fontSize: "2.6vh",
              marginBottom: "2vh",
            }}
          >
            Informations sur la {classData.classname}
          </Typography>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "#EFF7FE",
              borderRadius: "0.6vw",
              height: "7vh",
              width: "100%",
              margin: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Chip
              label={`${totalStudents} ${
                totalStudents > 1 ? "élèves" : "élève"
              }`}
              component="a"
              variant="outlined"
              sx={{
                background: "#3D6787",
                color: "#fff",
                fontFamily: "Itim",
                fontSize: "15px",
                fontWeight: 400,
              }}
            />
            <Chip
              label={`Niveau de la classe: ${classData.classSkillLevel[0].value}`}
              component="a"
              variant="outlined"
              sx={{
                background: "#3D6787",
                color: "#fff",
                fontFamily: "Itim",
                fontSize: "15px",
                fontWeight: 400,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              height: "8vh",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Grid item xs={2}>
              <FilterForm />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ height: "77%", width: "100%", display: "flex" }}
          >
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "#EFF7FE",
                borderRadius: "0.6vw",
                height: "100%",
                margin: "auto",
              }}
            ></Grid>
            <Grid item xs={1}></Grid>
            <Grid
              item
              xs={5}
              sx={{
                backgroundColor: "#EFF7FE",
                borderRadius: "0.6vw",
                height: "100%",
                margin: "auto",
              }}
            >
              <RecurrentErrors />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardClass;
