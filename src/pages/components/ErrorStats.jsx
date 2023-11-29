import React from "react";
import Box from "@mui/system/Box";

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
        <Box component="txt" sx={{
          fontSize:'2.6vh'
        }}>Erreurs récurrentes</Box>
      </Box>
    </>
  );
};

export default ErrorStats;
