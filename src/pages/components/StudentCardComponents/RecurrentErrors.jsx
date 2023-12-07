import React from "react";
import Box from "@mui/system/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { selectRecurrentErrors } from "../../../features/exercices/exerciceSelector";
import { LinearProgress } from "@mui/material";

const RecurrentErrors = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const recurrentErrors = useSelector(selectRecurrentErrors);

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
        {recurrentErrors.map((recurrentError) => (
          <>
            <Accordion
              expanded={expanded === "panel" + Object.keys(recurrentError)[0]}
              onChange={handleChange("panel" + Object.keys(recurrentError)[0])}
              key={recurrentError.key}
              sx={{ marginTop: "0.8vh" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={
                  "panel" + Object.keys(recurrentError)[0] + "bh-content"
                }
                id={"panel" + Object.keys(recurrentError)[0] + "bh-header"}
              >
                <Typography sx={{ width: "33%", flexShrink: 0, fontSize: "2.6vh" }}>
                  {Object.keys(recurrentError)[0]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {Object.entries(
                    recurrentError[Object.keys(recurrentError)[0]]
                  ).map(([key, value]) => (
                    <li key={key} style={{ position: "relative", listStyle: "none", marginTop:"1vh" }}>
                      <Box
                        width="100%"
                        position="relative"
                        sx={{
                          height: "5vh",
                          borderRadius: "0.8vw",
                          overflow: "hidden",
                          marginLeft: "-1.3vw"
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={90}
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
                          {key}
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
                          {value}%
                        </Typography>
                      </Box>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </>
        ))}
      </Box>
    </>
  );
};

export default RecurrentErrors;
