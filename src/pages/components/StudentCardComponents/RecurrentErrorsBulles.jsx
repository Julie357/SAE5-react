import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectRecurrentErrors } from "../../../features/exercices/exerciceSelector";

const RecurrentErrorsBulles = () => {
  const recurrentErrors = useSelector(selectRecurrentErrors);

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#ffffff5f",
        borderRadius: "0.6vw",
        height: "62%",
        width: "90%",
        margin: "auto",
        marginTop: "2%",
        padding: "0.8vh 1vw",
      }}
    >
      <Typography
        sx={{
          fontSize: "2.6vh",
          marginBottom: "2vh",
        }}
      >
        Erreurs récurrentes
      </Typography>

      {recurrentErrors.map((recurrentError, index) => (
        <div key={index}>
          <Typography variant="h6" sx={{ marginBottom: "1vh" }}>
            {Object.keys(recurrentError)[0]}
          </Typography>
          <ul>
            {Object.entries(recurrentError[Object.keys(recurrentError)[0]]).map(([key, value]) => (
              <li key={key} style={{ position: "relative", listStyle: "none", marginTop: "1vh" }}>
                <Typography>
                  {key}: {value}%
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Box>
  );
};

export default RecurrentErrorsBulles;
{/**
import React from "react";
import Box from "@mui/system/Box";
import { useSelector } from "react-redux";
import { selectRecurrentErrors } from "../../../features/exercices/exerciceSelector";

const RecurrentErrorsBulles = () => {
  const recurrentErrors = useSelector(selectRecurrentErrors);

  // Convert recurrentErrors to the format needed for ForceDirectedGraph
  const groupedData = [];
  recurrentErrors.forEach((recurrentError, index) => {
    const category = Object.keys(recurrentError)[0];
    const errors = Object.entries(recurrentError[category]);

    errors.forEach(([error, percentage]) => {
      groupedData.push({
        name: error,
        group: index + 1, // Using index as a simple way to assign unique groups
        size: percentage,
      });
    });
  });

  console.log("Data:", groupedData);

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#ffffff5f",
        borderRadius: "0.6vw",
        height: "62%",
        width: "90%",
        margin: "auto",
        marginTop: "2%",
        padding: "0.8vh 1vw",
      }}
    >
    
      </Box>
      );
    };
    
    export default RecurrentErrorsBulles;
    

*/}