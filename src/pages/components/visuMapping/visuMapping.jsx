import React, { useState } from "react";
import "./MappingWithHighlight.css";
import { FormControlLabel, Switch } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const Visu = ({ lexicalUnit }) => {
  const [isMasked, setMasked] = useState(false);

  return (
    <div>
      <FormControlLabel
        control={
          <Switch checked={isMasked} onChange={() => setMasked(!isMasked)} />
        }
        labelPlacement="start"
        label={`${!isMasked ? "Masquer le texte" : "Afficher le texte"}`}
      />

      <MappingWithHighlightWithText
        exercice={lexicalUnit}
        isMasked={isMasked}
      />
      <Legend />
    </div>
  );
};

export const getWordColor = (word) => {
  if (word.error) {
    switch (word.pos) {
      case "VERB":
      case "AUX":
        return "green";

      case "NOUN":
      case "ADJ":
      case "PROPN":
      case "PRON":
      case "ADP":
      case "PART":
      case "SCONJ":
        return "orange";

      case "PUNCT":
        return "grey";

      default:
        return "black";
    }
  }
  return "black";
};

export const getWordCategoryColor = (pos) => {
  switch (pos) {
    case "VERB":
    case "AUX":
      return "blue";

    case "NOUN":
    case "ADJ":
    case "PROPN":
    case "PRON":
    case "ADP":
    case "PART":
    case "SCONJ":
    case "ADV":
    case "DET":
    case "CCONJ":
      return "purple";

    case "PUNCT":
      return "pink";

    default:
      return "black";
  }
};

export const getWordCategoryColorByTime = (pos) => {
  switch (pos) {
    case pos < 250:
      return "blue";

    case pos < 450:
      return "green";

    case pos < 650:
      return "orange";

    case pos < 850:
      return "pink";

    case pos > 1000:
      return "grey";

    case pos > 1000:
      return "grey";

    default:
      return "black";
  }
};

const Legend = () => {
  const legendItems = [
    { color: "#CF97C4", type: "Grammaire" },
    { color: "#A1CDF1", type: "Conjugaison" },
    { color: "#FFB5A7", type: "Ponctuation" },
  ];

  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      {legendItems.map((item, index) => (
        <div key={index} style={{ marginRight: "20px" }}>
          <div
            style={{
              backgroundColor: item.color,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "5px",
            }}
          ></div>
          <span>{item.type}</span>
        </div>
      ))}
    </div>
  );
};

const MappingWithHighlightWithText = ({ exercice, isMasked }) => {
  console.log(exercice);
  const getHoverInfoText = (index) => {
    return `Type: ${exercice[index].pos} `;
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {exercice.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 &&
            getWordCategoryColor(exercice[index - 1].pos) !==
              getWordCategoryColor(item.pos) && <span>&nbsp;</span>}
          <Tooltip title={getHoverInfoText(index)} arrow placement="top">
            <span
              className={`highlight ${getWordCategoryColor(item.pos)} ${
                index > 0 &&
                getWordCategoryColor(exercice[index - 1].pos) !==
                  getWordCategoryColor(item.pos)
                  ? "different-color-before"
                  : ""
              } ${
                index < exercice.length - 1 &&
                getWordCategoryColor(item.pos) !==
                  getWordCategoryColor(exercice[index + 1].pos)
                  ? "different-color-after"
                  : ""
              } ${
                index > 0 &&
                index < exercice.length - 1 &&
                getWordCategoryColor(exercice[index - 1].pos) !==
                  getWordCategoryColor(item.pos) &&
                getWordCategoryColor(exercice[index + 1].pos) !==
                  getWordCategoryColor(item.pos)
                  ? "different-color"
                  : ""
              }`}
            >
              <span
                style={{
                  color: "black",
                  visibility: isMasked ? "hidden" : "visible",
                }}
              >
                {item.form}&nbsp;
              </span>
            </span>
          </Tooltip>
        </React.Fragment>
      ))}
    </div>
  );
};

const MappingWithTime = ({ exercice }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {exercice.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span style={{ marginRight: `${item.time * 10}px` }}>&nbsp;</span>
          )}
          <span
            className={`highlight ${getWordCategoryColorByTime(item.time)}`}
          >
            <span style={{ color: "black" }}>{item.form}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Visu;
