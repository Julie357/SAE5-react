import React from "react";
import Box from "@mui/system/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LinearProgress } from "@mui/material";

const RecurrentErrors = ({ currentStudent }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const recurrentErrors = currentStudent.studentsRecurrentError;
  console.log(recurrentErrors);

  // Fonction pour comparer les pourcentages décroissants
  const comparePercentagesDescending = (a, b) => b.count - a.count;

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
        {recurrentErrors &&
          Object.entries(recurrentErrors).map(([category, details]) => (
            <Accordion
              key={category}
              expanded={expanded === category}
              onChange={handleChange(category)}
              sx={{ marginTop: "0.8vh" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={category + "bh-content"}
                id={category + "bh-header"}
              >
                <Typography sx={{ width: "33%", flexShrink: 0, fontSize: "2.6vh" }}>
                  {category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {details.length === 0 ? (
                  <Typography>
                    Pas encore assez de données pour référencer les erreurs récurrentes
                  </Typography>
                ) : (
                  <ul>
                    {details
                      .slice()
                      .sort(comparePercentagesDescending)
                      .slice(0, 3)
                      .map((detail, index) => (
                        <li
                          key={index}
                          style={{
                            position: "relative",
                            listStyle: "none",
                            marginTop: "1vh",
                          }}
                        >
                          <Box
                            width="100%"
                            position="relative"
                            sx={{
                              height: "5vh",
                              borderRadius: "0.8vw",
                              overflow: "hidden",
                            }}
                          >
                            <LinearProgress
                              variant="determinate"
                              value={detail.count}
                              sx={{
                                height: "100%",
                                borderRadius: "0.8vw",
                                "& .MuiLinearProgress-barColorPrimary": {
                                  backgroundColor: "success",
                                },
                                "& .MuiLinearProgress-barColorSecondary": {
                                  backgroundColor: "warning",
                                },
                              }}
                            />
                            <Typography
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "5%",
                                transform: "translateY(-50%)",
                                color: "text.secondary",
                              }}
                            >
                              {detail.posDetails}
                            </Typography>
                            <Typography
                              sx={{
                                position: "absolute",
                                top: "50%",
                                right: "-0.8%",
                                transform: "translate(-50%, -50%)",
                                color: "text.secondary",
                              }}
                            >
                              {detail.count}%
                            </Typography>
                          </Box>
                        </li>
                      ))}
                  </ul>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </>
  );
};

export default RecurrentErrors;
