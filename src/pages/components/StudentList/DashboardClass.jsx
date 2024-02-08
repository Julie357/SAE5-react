import { Close } from "@mui/icons-material";
import { Box, Button, Chip, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import BubbleClass from "./Dashboards/BubbleClass";
import RecurrentErrors from "./Dashboards/RecurrentErrors";
import { FormControlLabel, Switch } from "@mui/material";
import BubbleRecurrentWords from "./Dashboards/BubbleRecurrentWords";

const DashboardClass = ({ classData, onClose }) => {
  const totalStudents = classData.studentOfClassById.length;
  const [errorsBubble, setBubble] = useState(true);

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
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontWeight="bolder"
              sx={{
                fontSize: "2.6vh",
                marginBottom: "2vh",
              }}
            >
              Informations sur la {classData.classLevel}
              {classData.classNumber}
            </Typography>
            <Button onClick={onClose} sx={{ marginBottom: "2vh" }}>
              <Close sx={{ color: "#3D6787" }} />
            </Button>
          </Grid>
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
              height: "4vh",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></Grid>
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
            >
              {classData ? (
                <>
                  {!errorsBubble ? (
                    <BubbleClass
                      recurrentErrors={classData.classRecurrentError}
                    />
                  ) : (
                    <BubbleRecurrentWords
                      allRecurrentWords={classData.ClassRecurrentPosUse}
                    />
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={errorsBubble}
                        onChange={() => setBubble(!errorsBubble)}
                      />
                    }
                    labelPlacement="start"
                    label={`${
                      !errorsBubble
                        ? "Voir les types de mots récurrents"
                        : "Voir les erreurs récurrentes"
                    }`}
                  />
                </>
              ) : (
                <CircularProgress />
              )}
            </Grid>
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
              <RecurrentErrors classData={classData} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardClass;
