import React from "react";
import { Badge, IconButton, Chip, Typography, Box, Card } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FetchStudentExercises from "../pages/fonctions/FetchStudentExercises";

const PageEleve = ({ nom, prenom, level, id }) => {
  const levelAverrage = level[0].value;
  const { studentExercisesUncorrected } = FetchStudentExercises(id);
  const totalExercisesUncorrected = studentExercisesUncorrected.length;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
      }}
    >
      <Badge
        badgeContent={`+${totalExercisesUncorrected}`}
        invisible={!totalExercisesUncorrected}
        color="primary"
        sx={{
          color: "FFB5A7",
          marginLeft: "4.5vw",
          marginTop: "15px",
        }}
      />
      <IconButton color="primary" fontSize="large" sx={{ fontSize: 100, p: 0 }}>
        <PersonIcon sx={{ fontSize: 120, color: "#91a8bb" }} />
      </IconButton>
      <Typography variant="body1">{`${nom} ${prenom}`}</Typography>
      <Chip
        sx={{
          m: 1,
          p: 1,
          fontWeight: "600",
          fontSize: "1rem",
          background: "#A1CDF1",
          color: "white",
          borderRadius: "10px",
        }}
        label={levelAverrage}
      />
    </Card>
  );
};

export default PageEleve;
