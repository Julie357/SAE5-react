import InsightsIcon from "@mui/icons-material/Insights";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Dialog,
  DialogActions,
  Divider,
  DialogContent,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Styles/stylePage.css";
import {
  selectExercices,
  selectLoadingExercices,
} from "../features/exercices/exerciceSelector";
import { selectLoadingLexical } from "../features/lexical/lexicalSelector";
import D3GraphBulle from "./components/GraphBulle/D3GraphBulle";
import UseFetchLexicalData from "./fonctions/FetchLexicalData";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import Visu from "./components/visuMapping/visuMapping";

const PageTexte = () => {
  const { idExercise } = useParams();
  const loadingExercises = useSelector(selectLoadingExercices);
  const allExercises = useSelector(selectExercices);
  const loadingLexical = useSelector(selectLoadingLexical);
  const [exerciseData, setExerciseData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [displayTextInline, setDisplayTextInline] = useState(true);
  const [conjugaisonChecked, setConjugaisonChecked] = useState(true);
  const [ponctuationChecked, setPonctuationChecked] = useState(true);
  const [correctionChecked, setCorrectionChecked] = useState(false);
  const [grammarChecked, setGrammarChecked] = useState(true);
  const [verbeChecked, setVerbeChecked] = useState(false);
  const [prenomChecked, setPrenomChecked] = useState(false);
  const [nomCommunChecked, setNomCommunChecked] = useState(false);
  const { lexicalData } = UseFetchLexicalData(exerciseData);
  const navigate = useNavigate();
  const [wordErrors, setWordErrors] = useState([]);
  const [recurrentWords, setRecurrentWords] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [reccurentWordReady, setReccurentWordReady] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [textData, setTextData] = useState([]);

  useEffect(() => {
    if (!loadingExercises) {
      const exerciseData = allExercises.find(
        (exercise) => exercise.idExercises == idExercise
      );

      if (exerciseData) {
        setExerciseData(exerciseData);
        setCorrectionChecked(exerciseData.correction);
      }

      if (lexicalData.lexicalUnit && !loadingLexical) {
        getWordErrors();
        getRecurrentWords();
      }
    }
  }, [loadingExercises, allExercises, idExercise, loadingLexical, lexicalData]);

  const handleTabChange = (_event, newTab) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
    }
  };

  const getWordErrors = async () => {
    const errorsByCategory = {
      Conjugaison: [],
      Ponctuation: [],
      Grammaire: [],
    };
    await lexicalData.lexicalUnit.forEach((unit) => {
      if (unit.error) {
        switch (unit.pos) {
          case "NOUN":
          case "ADJ":
          case "PROPN":
          case "PRON":
          case "ADP":
          case "PART":
          case "SCONJ":
            errorsByCategory.Grammaire.push(unit);
            break;

          case "VERB":
          case "AUX":
            errorsByCategory.Conjugaison.push(unit);
            break;

          case "PUNCT":
            errorsByCategory.Ponctuation.push(unit);
            break;

          default:
            break;
        }
      }
    });
    setWordErrors(errorsByCategory);
    setDataReady(true);
  };

  const getRecurrentWords = async () => {
    const reccurentWords = {
      Conjugaison: [],
      Ponctuation: [],
      Grammaire: [],
    };

    await lexicalData.lexicalUnit.forEach((unit) => {
      switch (unit.pos) {
        case "NOUN":
        case "ADJ":
        case "PROPN":
        case "PRON":
        case "ADP":
        case "PART":
        case "SCONJ":
          reccurentWords.Grammaire.push(unit);
          break;

        case "VERB":
        case "AUX":
          reccurentWords.Conjugaison.push(unit);
          break;

        case "PUNCT":
          reccurentWords.Ponctuation.push(unit);
          break;

        default:
          break;
      }
    });
    setRecurrentWords(reccurentWords);
    setReccurentWordReady(true);
  };

  const changeCorrected = async () => {
    try {
      await axios.get(
        `https://la-diwa-03.univ-lemans.fr/api/toggle-correction/${exerciseData.idExercises}`
      );
      setCorrectionChecked(!correctionChecked);
    } catch (error) {
      console.error("Erreur lors de la requête :", error.message);
    }
  };

  const fetchTextData = async () => {
    try {
      let dataImp = await axios.get(
        `https://la-diwa-03.univ-lemans.fr/api/get-all-text/${exerciseData.idExercises}`
      );
      setTextData(dataImp.data);
    } catch (error) {
      console.error("Erreur lors de la requête GET:", error.message);
    }
  };

  return (
    <>
      <Box sx={{ ml: 4, mt: 2, mb: -1, pl: 4 }}>
        <Link
          onClick={() => navigate(-1)}
          style={{ textDecoration: "none", color: "#3D6787" }}
        >
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <ArrowBack sx={{ mr: 1 }} />
            Retour aux exercices de l'élève
          </Typography>
        </Link>
      </Box>
      {exerciseData && (
        <>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ m: 4, mt: 0, p: 4, width: "60%" }}>
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
                        ? "#EBD4ED !important"
                        : "#EBD4ED !important",
                    color: "#8C6291",
                    fontSize: "18px",
                    borderRadius: "10px 10px 0 0 !important",
                    border: 0,
                  }}
                >
                  Erreurs
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

              {selectedTab === "tab1" && (
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "0 10px 10px 10px ",
                    fontFamily: "Itim",
                    border: "15px solid #D8ECFC",
                  }}
                >
                  <Typography variant="h4" sx={{ fontSize: 22, mb: 2 }}>
                    {exerciseData.title}
                  </Typography>
                  {lexicalData.lexicalUnit && (
                    <Visu lexicalUnit={lexicalData.lexicalUnit} />
                  )}
                </Box>
              )}

              {selectedTab === "tab2" && (
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "0 10px 10px 10px ",
                    fontFamily: "Itim",
                    border: "15px solid #EBD4ED",
                  }}
                >
                  {displayTextInline && (
                    <>
                      <Typography variant="h4" sx={{ fontSize: 22, mb: 2 }}>
                        {exerciseData.title}
                      </Typography>
                      {lexicalData.lexicalUnit &&
                        lexicalData.lexicalUnit.map((wordData, index) => {
                          let word = wordData["form"];
                          let wordId = wordData["id"];
                          let wordErrorConj = wordErrors.Conjugaison?.filter(
                            (wordUnit) => {
                              return wordUnit["id"] == wordId;
                            }
                          );
                          let wordErrorPunct = wordErrors.Ponctuation?.filter(
                            (wordUnit) => {
                              return wordUnit["id"] == wordId;
                            }
                          );

                          let wordErrorGrammar = wordErrors.Grammaire?.filter(
                            (wordUnit) => {
                              return wordUnit["id"] == wordId;
                            }
                          );
                          return (
                            <span
                              key={index}
                              style={{
                                color:
                                  (conjugaisonChecked &&
                                    wordErrorConj &&
                                    wordErrorConj.length > 0 &&
                                    "#C62323") ||
                                  (ponctuationChecked &&
                                    wordErrorPunct &&
                                    wordErrorPunct.length > 0 &&
                                    "#2364C6") ||
                                  (grammarChecked &&
                                    wordErrorGrammar &&
                                    wordErrorGrammar.length > 0 &&
                                    "#75C623") ||
                                  "",

                                borderBottom:
                                  (conjugaisonChecked &&
                                    wordErrorConj &&
                                    wordErrorConj.length > 0 &&
                                    "2px dashed #C62323") ||
                                  (ponctuationChecked &&
                                    wordErrorPunct &&
                                    wordErrorPunct.length > 0 &&
                                    "2px dotted #2364C6") ||
                                  (grammarChecked &&
                                    wordErrorGrammar &&
                                    wordErrorGrammar.length > 0 &&
                                    "2px solid #75C623") ||
                                  "none",
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
                    p: 4,
                    borderRadius: "0 10px 10px 10px ",
                    fontFamily: "Itim",
                    border: "15px solid #FCD5CE",
                  }}
                >
                  <Typography variant="h4" sx={{ fontSize: 22, mb: 2 }}>
                    {exerciseData.title}
                  </Typography>{" "}
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
                height: "100%",
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
                onClick={() => {
                  setPopupOpen(true);
                  fetchTextData();
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
                  mb: 1,
                }}
              >
                <Typography>
                  Niveau général du texte: {exerciseData.exercisesSkillLevel}
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={correctionChecked}
                    onChange={changeCorrected}
                  />
                }
                label={
                  correctionChecked
                    ? "Marquer comme non corrigé"
                    : "Marquer comme corrigé"
                }
                sx={{
                  m: 0,
                  width: "100%",
                  background: "#fff",
                  borderRadius: "5px",
                  mb: 1,
                }}
              />
              <FormGroup sx={{ width: "100%" }}>
                {selectedTab === "tab1" && (
                  <>
                    <FormControlLabel
                      control={<Checkbox defaultChecked={verbeChecked} />}
                      label="Verbe"
                      sx={{
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        mb: 0.5,
                        color: "#C62323",
                        textDecoration: "underline",
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked={prenomChecked} />}
                      label="Prénom"
                      sx={{
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        mb: 0.5,
                        color: "#2364C6",
                        textDecoration: "underline",
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked={nomCommunChecked} />}
                      label="Nom commun"
                      sx={{
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        mb: 0.5,
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
                          onChange={() =>
                            setConjugaisonChecked((prev) => !prev)
                          }
                        />
                      }
                      label="Conjugaison"
                      sx={{
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        mb: 0.5,
                        color: "#C62323",
                        textDecorationLine: "underline",
                        textDecorationStyle: "dashed",
                        textDecorationThickness: "2px",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={ponctuationChecked}
                          onChange={() =>
                            setPonctuationChecked((prev) => !prev)
                          }
                        />
                      }
                      label="Ponctuation"
                      sx={{
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        mb: 0.5,
                        color: "#2364C6",
                        textDecorationLine: "underline",
                        textDecorationStyle: "dotted",
                        textDecorationThickness: "2px",
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={grammarChecked}
                          onChange={() => setGrammarChecked((prev) => !prev)}
                        />
                      }
                      label="Grammaire"
                      sx={{
                        my: 1,
                        background: "#fff",
                        borderRadius: "5px",
                        m: 0,
                        mb: 0.5,
                        color: "#75C623",
                        textDecoration: "underline",
                        textDecorationThickness: "2px",
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
            {dataReady && reccurentWordReady ? (
              <>
                <D3GraphBulle
                  tab={selectedTab}
                  wordErrors={wordErrors}
                  reccurentWords={recurrentWords}
                />
              </>
            ) : (
              <CircularProgress />
            )}

            {console.log(textData)}
            <Dialog open={isPopupOpen} onClose={() => setPopupOpen(false)}>
              {textData ? (
                <DialogContent>
                  <Typography variant="h5">Performance</Typography>
                  <Divider
                    sx={{ backgroundColor: "#A1CDF1", height: 2, my: 0.25 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      m: 2,
                    }}
                  >
                    <Typography variant="body1">
                      score du texte : 75 sur 100. Ce score représente votre
                      qualité d'écriture dans ce texte.
                    </Typography>
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        variant="determinate"
                        value={75}
                        size={50}
                        thickness={4}
                        sx={{ color: "#A1CDF1" }}
                      />
                      <Typography
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "#A1CDF1",
                        }}
                      >
                        {75}%
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h5">Nombre de Mots</Typography>
                  <Divider
                    sx={{ backgroundColor: "#A1CDF1", height: 2, my: 0.25 }}
                  />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 1,
                      alignItems: "center",
                      m: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body1">
                        Caractères : {textData.nbCaractere}
                      </Typography>
                      <Typography variant="body1">
                        Phrases : A calculer
                      </Typography>
                      <Typography variant="body1">Mots : A calculer</Typography>
                    </Box>

                    <Box>
                      <Typography variant="body1">
                        Temps de lecture : {textData.readingTime} sec
                      </Typography>
                      <Typography variant="body1">
                        Temps de lecture orale : {textData.oralReadingTime} sec
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h5">Lisibilité</Typography>
                  <Divider
                    sx={{ backgroundColor: "#A1CDF1", height: 2, my: 0.25 }}
                  />
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr", // Deux colonnes égales
                      gap: 1, // Espace entre les colonnes
                      alignItems: "center",
                      m: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body1">
                        Taille des mots : {textData.wordLength} caractères
                      </Typography>
                      <Typography variant="body1">
                        Taille des phrases : {textData.sentenceLength}
                      </Typography>
                      <Typography variant="body1">
                        Score Total : A calculer
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h5">Vocabulaire</Typography>
                  <Divider
                    sx={{ backgroundColor: "#A1CDF1", height: 2, my: 0.25 }}
                  />
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr",
                      gap: 1,
                      alignItems: "center",
                      m: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body1">
                        Mots communs : on a pas les données
                      </Typography>
                      <Typography variant="body1">
                        Mots peu utilisés : on a pas les données
                      </Typography>
                      <Typography variant="body1">
                        Score Total : on a pas les données
                      </Typography>
                    </Box>
                  </Box>
                </DialogContent>
              ) : (
                <CircularProgress />
              )}

              <DialogActions>
                <Button onClick={() => setPopupOpen(false)}>Fermer</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      )}
    </>
  );
};

export default PageTexte;
