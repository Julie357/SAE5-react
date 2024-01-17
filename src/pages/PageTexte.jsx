import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  ToggleButton,
  ToggleButtonGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Switch,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InsightsIcon from "@mui/icons-material/Insights";
import Button from "@mui/material/Button";
import D3GraphBulle from "./components/GraphBulle/D3GraphBulle";
import "../Styles/stylePage.css";

const PageTexte = () => {
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [displayTextInlineTab1, setDisplayTextInlineTab1] = useState(true);
  const [displayTextInlineTab2, setDisplayTextInlineTab2] = useState(true);
  const [displayTextInlineTab3, setDisplayTextInlineTab3] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [textTab1, setTextTab1] = useState("");
  const [textTab2, setTextTab2] = useState(""); // faudra supprimer les autres quand on va passer à un texte commun pour tout les onglets avec les données récupéré
  const [textTab3, setTextTab3] = useState("");
  const [sentenceCountTab1, setSentenceCountTab1] = useState(0);
  const [sentenceCountTab2, setSentenceCountTab2] = useState(0); // faudra supprimer les autres quand on va passer à un texte commun pour tout les onglets avec les données récupéré
  const [sentenceCountTab3, setSentenceCountTab3] = useState(0);
  const [wordCountTab1, setWordCountTab1] = useState(0);
  const [wordCountTab2, setWordCountTab2] = useState(0); // faudra supprimer les autres quand on va passer à un texte commun pour tout les onglets avec les données récupéré
  const [wordCountTab3, setWordCountTab3] = useState(0);

  const handleTabChange = (event, newTab) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
  
      // Mettez à jour le texte de l'onglet 2 ici
      if (newTab === "tab1") {
        setTextTab1("Lorem ipsum dolor sit amet Ea sunt harum qui distinctio possimus hic maxime atque quo voluptatem voluptatem . Sit aperiamitaque et accusamus illum ut pased aperiam autem et commodiquam qui uis eius eum doloribus pariatur est doloremque autemAut quasi corporis et sint nemo quo vitae quasi eum dolorumgalisum eos quae reprehenderit est aperiam senescent idvoluptatem earum ? Et accusamus assumenda in facilis solutaut eaque facere ex placeat ipsa et galisum facere in consequaturpariatur, id quia quia . Est omnis odio et sint nobis ex dictapossimus qui enim sint ut facere ipsa eum ipsum numquam quiratione consectetur . Non galisum molestias et natus nemo quimaiores harum est adipisci dignissimos .");
        setSentenceCountTab1(countSentences(textTab1));
        setWordCountTab1(countWords(textTab1));
    } else if (newTab === "tab2") {
        setTextTab2("Lorem ipsum dolor sit amet. Ea sunt harum qui distinctio possimus hic maxime atque quo voluptatem voluptatem. Sit aperiamitaque et accusamus illum ut pased aperiam autem et commodiquam qui uis eius eum doloribus pariatur est doloremque autemAut quasi corporis et sint nemo quo vitae quasi eum dolorumgalisum eos quae reprehenderit est aperiam senescent idvoluptatem earum ? Et accusamus assumenda in facilis solutaut eaque facere ex placeat ipsa et galisum facere in consequaturpariatur, id quia quia. Est omnis odio et sint nobis ex dictapossimus qui enim sint ut facere ipsa eum ipsum numquam quiratione consectetur. Non galisum molestias et natus nemo quimaiores harum est adipisci dignissimos.");
        setSentenceCountTab2(countSentences(textTab2));
        setWordCountTab2(countWords(textTab2));
      } else if (newTab === "tab3") {
        setTextTab3("Contenu de l'onglet 3.");
        setSentenceCountTab3(countSentences(textTab3));
        setWordCountTab3(countWords(textTab3));
      }
    }
  };

  const calculateCharCount = (text) => {
    return text.length;
  };

  const countSentences = (text) => {
    const sentences = text.split(/[.?!;]/g).filter((sentence) => sentence.trim() !== '');
    return sentences.length;
  };

  const countWords = (text) => {
    const words = text.split(/[ ]/g).filter((word) => word.trim() !== '');
    return words.length;
  };
  
  
  
  let charCount;
 
  
  // Sélectionnez le texte de l'onglet actuel en fonction de la valeur de selectedTab
  if (selectedTab === "tab1") {
    charCount = calculateCharCount(textTab1);
  } else if (selectedTab === "tab2") {
    charCount = calculateCharCount(textTab2);
  } else if (selectedTab === "tab3") {
    charCount = calculateCharCount(textTab3);
  }

  let sentenceCount;
  if (selectedTab === "tab1") {
    sentenceCount = countSentences(textTab1);
  } else if (selectedTab === "tab2") {
    sentenceCount = countSentences(textTab2);
  } else if (selectedTab === "tab3") {
    sentenceCount = countSentences(textTab3);
  }
  
  let wordCount;
  if (selectedTab === "tab1") {
    wordCount = countWords(textTab1);
  } else if (selectedTab === "tab2") {
    wordCount = countWords(textTab2);
  } else if (selectedTab === "tab3") {
    wordCount = countWords(textTab3);
  }



  const handleDisplayTextInlineChangeTab1 = () => {
    setDisplayTextInlineTab1((prev) => !prev);
  };
  const handleDisplayTextInlineChangeTab2 = () => {
    setDisplayTextInlineTab2((prev) => !prev);
  };
  const handleDisplayTextInlineChangeTab3 = () => {
    setDisplayTextInlineTab3((prev) => !prev);
  };

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const calculateProgress = (score) => {
    switch (score) {
      case "A1":
        return 10;
      case "A2":
        return 20;
      case "B1":
        return 40;
      case "B2":
        return 60;
      case "C1":
        return 80;
      case "C2":
        return 100;
      default:
        return 0; // Valeur par défaut si le score n'est pas reconnu
    }
  };

  // Utilisez la fonction pour obtenir la progression
  const scoreText = "B1"; // Remplacez cela par le score réel du texte
  const progress = calculateProgress(scoreText);

  const theme = createTheme({
    typography: {
      fontFamily: "Itim", // Ajoutez la police souhaitée ici
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: 500,
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
                    ? "#CFD6E7 !important"
                    : "#CFD6E7 !important",
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
                    ? "#DFE7CF !important"
                    : "#DFE7CF !important",
                color: selectedTab === "tab1" ? "#59683C" : "#59683C",
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
                    ? "#E7D8CF !important"
                    : "#E7D8CF !important",
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
                background: "#CFD6E7",
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
              {/* Contenu de l'onglet 1 */}
              <p>
                Lorem ipsum dolor sit amet.{" "}
                <a href="a" className="err-conjugaison">
                  Ea sunt
                </a>{" "}
                harum qui distinctio{" "}
                <a className="err-syntaxe" href="a">
                  possimus
                </a>{" "}
                hic maxime atque quo voluptatem{" "}
                <a className="err-conjugaison" href="a">
                  voluptatem
                </a>
                . Sit aperiam itaque et accusamus illum ut pased aperiam autem
                et commodi quam qui{" "}
                <a className="err-syntaxe" href="a">
                  quis eius
                </a>{" "}
                eum doloribus pariatur est doloremque autem. Aut quasi corporis
                <a className="err-ponctuation" href="a">
                  ?{" "}
                </a>{" "}
                et sint nemo quo vitae quasi eum dolorum galisum eos quae{" "}
                <a className="err-conjugaison" href="a">
                  reprehenderit
                </a>{" "}
                est aperiam senescent id voluptatem earum ? Et accusamus 🤔{" "}
                <a className="err-conjugaison" href="a">
                  assumenda
                </a>{" "}
                in facilis soluta ut eaque facere ex placeat ipsa et galisum
                facere in consequatur pariatur
                <a className="err-ponctuation" href="a">
                  ,
                </a>{" "}
                id quia quia. Est omnis odio et sint nobis ex dicta possimus qui
                enim sint ut facere ipsa{" "}
                <a className="err-syntaxe " href="a">
                  eum ipsum
                </a>{" "}
                numquam qui ratione consectetur. Non galisum molestias et{" "}
                <a className="err-conjugaison" href="a">
                  natus
                </a>{" "}
                nemo qui maiores harum est adipisci dignissimos.
              </p>
            </Box>
          )}

          {selectedTab === "tab2" && (
            <Box
              sx={{
                background: "#DFE7CF",
                p: 4,
                borderRadius: "0 10px 10px 10px ",
                fontFamily: "Itim",
              }}
            >
              {/* Contenu de l'onglet 2 */}
              <p>
                Lorem ipsum dolor sit amet. Ea sunt harum qui distinctio
                possimus hic maxime atque quo voluptatem voluptatem. Sit aperiam
                itaque et accusamus illum ut pased aperiam autem et commodi
                quam qui uis eius eum doloribus pariatur est doloremque autem.
                Aut quasi corporis et sint nemo quo vitae quasi eum dolorum
                galisum eos quae reprehenderit est aperiam senescent id
                voluptatem earum ? Et accusamus assumenda in facilis soluta
                ut eaque facere ex placeat ipsa et galisum facere in consequatur
                pariatur, id quia quia. Est omnis odio et sint nobis ex dicta
                possimus qui enim sint ut facere ipsa eum ipsum numquam qui
                ratione consectetur. Non galisum molestias et natus nemo qui
                maiores harum est adipisci dignissimos.
              </p>
            </Box>
          )}

          {selectedTab === "tab3" && (
            <Box
              sx={{
                background: "#E7D8CF",
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
            background: "#CFD6E7",
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
            }}
            onClick={handlePopupOpen}
          >
            Statistiques du texte
          </Button>
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
        <Dialog open={isPopupOpen} onClose={handlePopupClose}>
          <DialogContent>
            <Typography variant="h2">Performance</Typography>
            <Divider sx={{ backgroundColor: "#A1CDF1", height: 2, my: 0.25 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                m: 2,
              }}
            >
              <Typography variant="body1">
                score du texte : {progress} sur 100. Ce score représente votre
                qualité d'écriture dans ce texte.
              </Typography>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={progress} // Remplacez cela par votre score réel sur 100
                  size={50} // Ajustez la taille du cercle selon vos besoins
                  thickness={4} // Ajustez l'épaisseur du cercle selon vos besoins
                  sx={{ color: "#A1CDF1" }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#A1CDF1",
                  }}
                >
                  {progress}%
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2">Nombre de Mots</Typography>
<Divider sx={{ backgroundColor: "#A1CDF1", height: 2, my: 0.25 }} />

<Box
  sx={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Deux colonnes égales
    gap: 1, // Espace entre les colonnes
    alignItems: "center",
    m: 2,
  }}
>
  {/* Première colonne */}
  <Box>
  <Typography variant="body1">Charactères : {charCount}</Typography>
  <Typography variant="body1">Phrases : {sentenceCount}</Typography>
    <Typography variant="body1">Mots : {wordCount}</Typography>
  </Box>

  <Box>
    <Typography variant="body1">Temps de lecture : 39 sec</Typography>
    <Typography variant="body1">
      Temps de lecture orale : 1 min 16 sec
    </Typography>
  </Box>
</Box>



            <Typography variant="h2">Lisibilité</Typography>
            <Divider sx={{ backgroundColor: "#A1CDF1", height: 2, my: 0.25 }} />
            <p>Contenu de la partie...</p>

            <Typography variant="h2">Vocabulaire</Typography>
            <Divider sx={{ backgroundColor: "#A1CDF1", height: 2, my: 0.25 }} />
            <p>Contenu de la partie...</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose}>Fermer</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Box
        sx={{
          m: 8,
          p: 4,
          background: "#CFD6E7",
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
                backgroundColor: "#fff",
                border: "2px solid black",
                borderRadius: "50%",
              }}
            ></Box>
            <p>1 erreur</p>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PageTexte;
