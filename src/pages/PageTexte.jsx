import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  ToggleButton,
  ToggleButtonGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import Button from "@mui/material/Button";
import D3GraphBulle from "./components/GraphBulle/D3GraphBulle";
import "../Styles/stylePage.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectExercices,
  selectLoadingExercices,
} from "../features/exercices/exerciceSelector";
import { selectLoadingLexical } from "../features/lexical/lexicalSelector";
import jsonData from "./Untitled-1.json";
import UseFetchLexicalData from "./fonctions/FetchLexicalData";

const PageTexte = () => {
  const { idExercise } = useParams();
  const loadingExercises = useSelector(selectLoadingExercices);
  const allExercises = useSelector(selectExercices);
  const loadingLexical = useSelector(selectLoadingLexical);
  const [exerciseData, setExerciseData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [displayTextInline, setDisplayTextInline] = useState(true); // Common display text state
  const [conjugaisonChecked, setConjugaisonChecked] = useState(false);
  const [ponctuationChecked, setPonctuationChecked] = useState(false);
  const [syntaxeChecked, setSyntaxeChecked] = useState(false);
  const [verbeChecked, setVerbeChecked] = useState(false); // New checkbox state
  const [prenomChecked, setPrenomChecked] = useState(false); // New checkbox state
  const [nomCommunChecked, setNomCommunChecked] = useState(false); // New checkbox state
  const [wordData, setWordData] = useState([]);
  const [wordDataWithStyles, setWordDataWithStyles] = useState([]);
  const { lexicalData } = UseFetchLexicalData(exerciseData);

  useEffect(() => {
    if (!loadingExercises) {
      const exerciseData = allExercises.find(
        (exercise) => exercise.idExercises == idExercise
      );

      if (exerciseData) {
        setExerciseData(exerciseData);
      }
    }
  }, [loadingExercises, allExercises, idExercise, loadingLexical]);

  const handleTabChange = (event, newTab) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
    }
  };

  const handleDisplayTextInlineChange = () => {
    setDisplayTextInline((prev) => !prev);
  };

  const handleResetConjugaison = () => {
    setConjugaisonChecked(false);
    setPonctuationChecked(false);
    setSyntaxeChecked(false);
    setVerbeChecked(false);
    setPrenomChecked(false);
    setNomCommunChecked(false);
  };

  const handleConjugaisonCheckboxChange = async () => {
    const newConjugaisonChecked = !conjugaisonChecked;
    setConjugaisonChecked(newConjugaisonChecked);
    const errorArray = [];

    if (newConjugaisonChecked) {
      console.log(newConjugaisonChecked);

      await lexicalData.lexicalUnit.forEach((unit) => {
        if (unit.error) {
          errorArray.push(unit);
        }
      });
    }

    setWordDataWithStyles(errorArray);
  };

  return (
    <>
      {exerciseData && (
        <>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ m: 4, p: 4, width: "60%" }}>
              <ToggleButtonGroup
                value={selectedTab}
                exclusive
                onChange={handleTabChange}
                aria-label="text alignment"
                sx={{ borderRadius: "0 0 0 0 !important", border: 0 }}
              >
                <ToggleButton
                  value="tab1"
                  aria-label="left aligned"
                  sx={{
                    px: 1,
                    mr: 1,
                    background:
                      selectedTab === "tab1"
                        ? "#D8ECFC !important"
                        : "#D8ECFC !important",
                    color: selectedTab === "tab1" ? "#414755" : "#414755",
                    fontSize: "18px",
                    borderRadius: "10px 10px 0 0 !important",
                    border: 0,
                  }}
                >
                  Cohésion/Niveau
                </ToggleButton>
                <ToggleButton
                  value="tab2"
                  aria-label="centered"
                  sx={{
                    px: 1,
                    mx: 1,
                    background:
                      selectedTab === "tab1"
                        ? "#F9DCC4 !important"
                        : "#F9DCC4 !important",
                    color: selectedTab === "tab1" ? "#C29773" : "#C29773",
                    fontSize: "18px",
                    borderRadius: "10px 10px 0 0 !important",
                    border: 0,
                  }}
                >
                  Fautes
                </ToggleButton>
                <ToggleButton
                  value="tab3"
                  aria-label="right aligned"
                  sx={{
                    px: 1,
                    ml: 1,
                    background:
                      selectedTab === "tab1"
                        ? "#FCD5CE !important"
                        : "#FCD5CE !important",
                    color: selectedTab === "tab1" ? "#8D6750" : "#8D6750",
                    fontSize: "18px",
                    borderRadius: "10px 10px 0 0 !important",
                    border: 0,
                  }}
                >
                  Vitesse
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Contenu spécifique à chaque onglet */}
              {selectedTab === "tab1" && (
                <Box
                  sx={{
                    background: "#D8ECFC",
                    p: 4,
                    borderRadius: "0 10px 10px 10px ",
                    fontFamily: "Itim",
                  }}
                >
                  <p>{displayTextInline && exerciseData.content}</p>
                </Box>
              )}

              {selectedTab === "tab2" && (
                <Box
                  sx={{
                    background: "#F9DCC4",
                    p: 4,
                    borderRadius: "0 10px 10px 10px ",
                    fontFamily: "Itim",
                  }}
                >
                  {/* Contenu de l'onglet 2 */}
                  {displayTextInline && (
                    <>
                      {exerciseData.content &&
                        exerciseData.content.split(" ").map((word, index) => {
                          const wordDataItem = wordDataWithStyles[index];
                          return (
                            <span
                              key={index}
                              style={{
                                color: wordDataItem ? "red" : "",
                              }}
                            >
                              {word}{" "}
                            </span>
                          );
                        })}
                    </>
                  )}
                </Box>
              )}

              {selectedTab === "tab3" && (
                <Box
                  sx={{
                    background: "#FCD5CE",
                    p: 4,
                    borderRadius: "0 10px 10px 10px ",
                    fontFamily: "Itim",
                  }}
                >
                  {/* Contenu de l'onglet 3 */}
                  <p>{displayTextInline && exerciseData.content}</p>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                m: 8,
                p: 2,
                width: "20%",
                background: "#D8ECFC",
                borderRadius: "10px",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<InsightsIcon />}
                sx={{
                  color: "#000",
                  background: "#fff",
                  border: 0,
                  my: 1,
                  width: "100%",
                  paddingLeft: 0,
                  textTransform: "none",
                  fontSize: 16,
                }}
              >
                Statistiques du texte
              </Button>
              <Box
                sx={{
                  color: "#000",
                  background: "#fff",
                  border: 0,
                  width: "100%",
                  padding: 1,
                  borderRadius: 1,
                }}
              >
                <Typography>
                  Niveau général du texte: {exerciseData.exercisesSkillLevel}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                sx={{
                  color: "#000",
                  background: "#fff",
                  border: 0,
                  my: 1,
                  width: "100%",
                }}
              >
                Voir toutes les erreurs
              </Button>
              <FormGroup sx={{ width: "100%" }}>
                {selectedTab === "tab1" && (
                  <>
                    <FormControlLabel
                      control={<Checkbox defaultChecked={verbeChecked} />}
                      label="Verbe"
                      sx={{
                        m: "8px",
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        color: "#C62323",
                        textDecoration: "underline",
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked={prenomChecked} />}
                      label="Prénom"
                      sx={{
                        my: 1,
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        color: "#2364C6",
                        textDecoration: "underline",
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked={nomCommunChecked} />}
                      label="Nom commun"
                      sx={{
                        my: 1,
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        color: "#75C623",
                        textDecoration: "underline",
                      }}
                    />
                  </>
                )}

                {selectedTab === "tab2" && (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={conjugaisonChecked}
                          onChange={handleConjugaisonCheckboxChange}
                        />
                      }
                      label="Conjugaison"
                      sx={{
                        m: "8px",
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        color: "#C62323",
                        textDecoration: "underline",
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked={ponctuationChecked} />}
                      label="Ponctuation"
                      sx={{
                        my: 1,
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        color: "#2364C6",
                        textDecoration: "underline",
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked={syntaxeChecked} />}
                      label="Syntaxe"
                      sx={{
                        my: 1,
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        color: "#75C623",
                        textDecoration: "underline",
                      }}
                    />
                  </>
                )}
              </FormGroup>
            </Box>
          </Box>
          <Box
            sx={{
              m: 8,
              p: 4,
              background: "#D8ECFC",
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <D3GraphBulle />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <p>Légende :</p>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <p> </p>
                </Box>
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#ffe6e2",
                    border: "2px solid black",
                    borderRadius: "50%",
                  }}
                ></Box>
                <p>Cohésion</p>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <p> </p>
                </Box>
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#a1cdf1",
                    border: "2px solid black",
                    borderRadius: "50%",
                  }}
                ></Box>
                <p>Conjugaison</p>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <p> </p>
                </Box>
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#ffb5a7",
                    border: "2px solid black",
                    borderRadius: "50%",
                  }}
                ></Box>
                <p>1 erreur</p>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default PageTexte;
