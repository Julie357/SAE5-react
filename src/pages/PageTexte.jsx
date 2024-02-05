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

const PageTexte = () => {
  const { idExercise } = useParams();
  const loadingExercises = useSelector(selectLoadingExercices);
  const allExercises = useSelector(selectExercices);
  const loadingLexical = useSelector(selectLoadingLexical);
  const [exerciseData, setExerciseData] = useState(null);
  const [lexical, setLexical] = useState(null);
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [displayTextInlineTab1, setDisplayTextInlineTab1] = useState(true);
  const [displayTextInlineTab2, setDisplayTextInlineTab2] = useState(true);
  const [displayTextInlineTab3, setDisplayTextInlineTab3] = useState(true);
  const [conjugaisonChecked, setConjugaisonChecked] = useState(true);
  const [ponctuationChecked, setPonctuationChecked] = useState(true);
  const [syntaxeChecked, setSyntaxeChecked] = useState(true);

  useEffect(() => {
    console.log("useEffect triggered");

    if (!loadingExercises) {
      const exerciseData = allExercises.find(
        (exercise) => exercise.idExercises == idExercise
      );

      console.log("exerciseData", exerciseData);

      if (exerciseData) {
        setExerciseData(exerciseData);

        if (!loadingLexical) {
          const idsLexical = exerciseData.idLexical;
          console.log("idsLexical", idsLexical);

          if (idsLexical) {
            setLexical(idsLexical);
          }
        }
      }
    }
  }, [loadingExercises, allExercises, idExercise, loadingLexical]);

  const handleTabChange = (event, newTab) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
    }
  };

  const handleDisplayTextInlineChangeTab1 = () => {
    setDisplayTextInlineTab1((prev) => !prev);
  };
  const handleDisplayTextInlineChangeTab2 = () => {
    setDisplayTextInlineTab2((prev) => !prev);
  };
  const handleDisplayTextInlineChangeTab3 = () => {
    setDisplayTextInlineTab3((prev) => !prev);
  };

  const handleResetConjugaison = () => {
    setConjugaisonChecked(true);
    setPonctuationChecked(true);
    setSyntaxeChecked(true);
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
                  <FormControlLabel
                    control={
                      <Switch
                        checked={displayTextInlineTab1}
                        onChange={handleDisplayTextInlineChangeTab1}
                      />
                    }
                    label="Afficher en ligne"
                  />

                  <p>{exerciseData.content}</p>
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
                  <p>
                    Lorem ipsum dolor sit amet. Ea sunt harum qui distinctio
                    possimus hic maxime atque quo voluptatem voluptatem. Sit
                    aperiam itaque🤔 et accusamus illum ut pased aperiam autem
                    et commodi quam qui uis eius eum doloribus pariatur est
                    doloremque autem. 🤔Aut quasi corporis et sint nemo quo
                    vitae quasi eum dolorum galisum eos quae reprehenderit est
                    aperiam senescent id voluptatem earum ? Et accusamus 🤔
                    assumenda in facilis soluta ut eaque facere ex placeat ipsa
                    et galisum facere in consequatur pariatur, id quia quia. Est
                    omnis odio et sint nobis ex dicta possimus qui enim sint ut
                    facere ipsa eum ipsum numquam qui 🤔ratione consectetur. Non
                    galisum molestias et natus nemo qui maiores harum est
                    adipisci dignissimos.
                  </p>
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
                  <p>Contenu de l'onglet 3</p>
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
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
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
                  control={<Checkbox defaultChecked />}
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
                  control={<Checkbox defaultChecked />}
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
              <Box sx={{ display: "flex", marginBottom: 1, alignItems: 'center' }}>
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#ffb5a7",
                    border: "2px solid black",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                ></Box>
                {selectedTab === "tab1" && (
                  <p>Collocation</p>
                )}
                {selectedTab === "tab2" && (
                  <p>Conjugaison</p>
                )}
                {selectedTab === "tab3" && (
                  <p>Vitesse lente</p>
                )}
              </Box>
              <Box sx={{ display: "flex", marginBottom: 1, alignItems: 'center' }}>
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#a1cdf1",
                    border: "2px solid black",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                ></Box>
                {selectedTab === "tab1" && (
                  <p>Cohésion</p>
                )}
                {selectedTab === "tab2" && (
                  <p>Ponctuation</p>
                )}
                {selectedTab === "tab3" && (
                  <p>Vitesse rapide</p>
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: 'center' }}>
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#ffe6e2",
                    border: "2px solid black",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                ></Box>
                {selectedTab === "tab1" && (
                  <p>Contenu pour l'onglet 1</p>
                )}
                {selectedTab === "tab2" && (
                  <p>Syntaxe</p>
                )}
                {selectedTab === "tab3" && (
                  <p>Pause</p>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default PageTexte;
