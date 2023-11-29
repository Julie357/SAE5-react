import React from "react";
import Box from "@mui/system/Box";
import ErrorStats from "../ErrorStats";

const StudentProfile = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          backgroundColor: "#D8ECFC",
          borderRadius: "0.6vw",
          height: "100%",
          width: "36vw",
        }}
      >
        <Box
          component="div"
          sx={{
            width: "90%",
            height: "22%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "2vh",
          }}
        >
          <Box component="img" sx={{ width: "35%", height: "100%" }}></Box>
          <Box
            component="txt"
            sx={{
              width: "60%",
              textAlign: "start",
              fontSize: "4.5vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box component="txt" sx={{ textTransform: "uppercase" }}>
              Buisson
            </Box>
            <Box component="txt">Claire</Box>
            <Box component="txt">3°6</Box>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            fontSize: "3vh",
            width: "90%",
            margin: "auto",
            marginTop: "1vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box component="txt">Niveau: B2</Box>
          <Box component="txt">Exercices effectués: 40</Box>
        </Box>
        <ErrorStats />
      </Box>
    </>
  );
};

export default StudentProfile;
