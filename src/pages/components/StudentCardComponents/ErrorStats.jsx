import React from "react";
import Box from "@mui/system/Box";
import { Typography } from "@mui/material";

const ErrorStats = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          backgroundColor: "#ffffff5f",
          borderRadius: "0.6vw",
          height: "62%",
          width: "90%",
          margin: "auto",
          marginTop: "2%",
          padding: '0.8vh 1vw'
        }}
      >
        <Typography sx={{
          fontSize:'2.6vh'
        }}>Erreurs récurrentes</Typography>
      </Box>
    </>
  );
};

export default ErrorStats;
