import React from 'react';
import './MappingWithHighlight.css'; // Ajoutez le fichier CSS pour ce composant
import { color } from 'd3';

const Visu = ({lexicalUnit}) => {
  // const exercice1 = [
  //   { "id": 1, "form": "Meine", "lemma": "mein", "pos": "PRON", "morphology": "PPOSAT", "features": { "Case": "Nom", "Gender": "Fem", "Number": "Sing", "Poss": "Yes" }, "head": 2, "dep_rel": "det:poss", "error": true ,"time": 768},
  //   { "id": 2, "form": "Motivation", "lemma": "Motivation", "pos": "NOUN", "morphology": "NN", "features": { "Case": "Nom", "Gender": "Fem", "Number": "Sing" }, "head": 7, "dep_rel": "nsubj:pass", "error": true,"time": 486 },
  //   { "id": 3, "form": "um", "lemma": "um", "pos": "ADP", "morphology": "APPR", "head": 5, "dep_rel": "case", "error": true ,"time": 580},
  //   { "id": 4, "form": "deutsche", "lemma": "deutsch", "pos": "ADJ", "morphology": "ADJA", "features": { "Case": "Acc", "Gender": "Fem", "Number": "Sing" }, "head": 5, "dep_rel": "amod", "error": false ,"time": 1542},
  //   { "id": 5, "form": "Sprache", "lemma": "Sprache", "pos": "NOUN", "morphology": "NN", "features": { "Case": "Acc", "Gender": "Fem", "Number": "Sing" }, "head": 2, "dep_rel": "nmod", "error": false ,"time": 3562},
  //   { "id": 6, "form": "zu", "lemma": "zu", "pos": "PART", "morphology": "NN", "features": { "Case": "Acc", "Gender": "Masc", "Number": "Plur" }, "head": 7, "dep_rel": "mark", "error": false,"time": 398},
  //   { "id": 7, "form": "lernen", "lemma": "lernen", "pos": "VERB", "morphology": "VVINF", "features": { "VerbForm": "Inf" }, "head": 0, "dep_rel": "root", "error": false ,"time":678},
  //   { "id": 8, "form": "ist", "lemma": "sein", "pos": "AUX", "morphology": "ADJD", "head": 7, "dep_rel": "aux:pass", "features": { "SpaceAfter": "No" }, "error": true,"time": 5800 },
  //   { "id": 9, "form": ",", "lemma": ",", "pos": "PUNCT", "morphology": "$,", "head": 12, "dep_rel": "punct", "error": false ,"time": 548},
  //   { "id": 10, "form": "dass", "lemma": "dass", "pos": "SCONJ", "morphology": "KOUS", "head": 12, "dep_rel": "mark", "error": true ,"time": 764},
  //   { "id": 11, "form": "ich", "lemma": "ich", "pos": "PRON", "morphology": "PPER", "features": { "Case": "Nom", "Number": "Sing", "Person": "1", "PronType": "Prs" }, "head": 12, "dep_rel": "nsubj", "error": false,"time": 1025 },
  //   { "id": 12, "form": "habe", "lemma": "haben", "pos": "VERB", "morphology": "VAFIN", "features": { "Mood": "Sub", "Number": "Sing", "Person": "3", "Tense": "Pres", "VerbForm": "Fin" }, "head": 7, "dep_rel": "ccomp", "error": false,"time": 6845 },
  //   { "id": 13, "form": "ehemaligen", "lemma": "ehemalig", "pos": "ADJ", "morphology": "ADJA", "features": { "Case": "Dat", "Gender": "Neut", "Number": "Plur" }, "head": 14, "dep_rel": "amod", "error": false ,"time": 845},
  //   { "id": 14, "form": "Vorfahren", "lemma": "Vorfahr|Vorfahren", "pos": "NOUN", "morphology": "NN", "features": { "Case": "Dat", "Gender": "Neut", "Number": "Plur" }, "head": 12, "dep_rel": "obj", "error": false,"time": 2510 },
  //   { "id": 15, "form": "in", "lemma": "in", "pos": "ADP", "morphology": "APPR", "head": 16, "dep_rel": "case", "error": true ,"time": 349},
  //   { "id": 16, "form": "Deutschland", "lemma": "Deutschland", "pos": "PROPN", "morphology": "NE", "features": { "Case": "Dat", "Gender": "Neut", "Number": "Sing", "SpaceAfter": "No" }, "head": 14, "dep_rel": "nmod", "error": false ,"time": 487},
  //   { "id": 17, "form": ".", "lemma": ".", "pos": "PUNCT", "morphology": "$.", "head": 7, "dep_rel": "punct", "error": true ,"time": 745}
  // ];
  
  const text = lexicalUnit.map(item => item.form).join(' ');

  return (
    <div>
      <Mapping text={text} exercice={lexicalUnit} />
      <MappingWithHighlight exercice={lexicalUnit} />
      <Legend />
      <MappingWithHighlightWithText exercice={lexicalUnit} />

      {/* <WordChart words={exercice1} /> */}
    </div>
  );
};

export const getWordColor = (word) => {
  // Ajoutez ici la logique pour obtenir la couleur en fonction du type du mot
  if (word.error) {
    switch (word.pos) {
      case 'NOUN':
      case 'ADJ':
      case 'PROPN':
        return 'blue';

      case 'VERB':
      case 'AUX':
        return 'green';

      case 'PRON':
      case 'ADP':
      case 'PART':
      case 'SCONJ':
        return 'orange'; 

      case 'PUNCT':
        return 'grey';

      default:
        return 'black';
    }
  }
  return 'black';
};

const Mapping = ({ exercice }) => {
  return (
    <div>
      {exercice.map((item, index) => (
        <span key={index} style={{ color: getWordColor(item) }}>
          {item.form}{' '}
        </span>
      ))}
    </div>
  );

};

export const getWordCategoryColor = (pos) => {
  switch (pos) {
    case 'NOUN':
    case 'PROPN':
      return 'blue';

    case 'VERB':
    case 'AUX':
      return 'green';

    case 'PRON':
    case 'ADJ':
      return 'orange';

    case 'ADP':
    case 'PART':
    case 'SCONJ':
      return 'pink';

    case 'PUNCT':
      return 'grey';

    default:
      return 'black';
  }
};

export const getWordCategoryColorByTime = (pos) => {
  switch (pos) {
    case pos < 250 :
      return 'blue';

    case pos < 450 :
      return 'green';

      case pos < 650 :
        return 'orange';

        case pos < 850 :
          return 'pink';

          case pos > 1000 :
            return 'grey';

            case pos > 1000 :
              return 'grey';

    default:
      return 'black';
  }
};

const Legend = () => {
  // Définition des couleurs et des types de mots pour la légende
  const legendItems = [
    { color: 'blue', type: 'Orthographe' },
    { color: 'green', type: 'Conjugaison' },
    { color: 'orange', type: 'Grammaire' },
    { color: 'grey', type: 'Ponctuation' },
  ];

  return (
    <div style={{ display: 'flex', marginTop: '10px' }}>
      {legendItems.map((item, index) => (
        <div key={index} style={{ marginRight: '20px' }}>
          <div style={{ backgroundColor: item.color, width: '20px', height: '20px', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></div>
          <span>{item.type}</span>
        </div>
      ))}
    </div>
  );
};

// const MappingWithHighlight = ({ exercice }) => {
//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//       {exercice.map((item, index) => (
//         <React.Fragment key={index}>
//           {index > 0 && <span style={{ marginRight: `${item.time * 10}px` }}>&nbsp;</span>}
//           <span className={`highlight ${getWordCategoryColor(item.pos)}`}>
//             <span className="invisible-text">{item.form}</span>
//           </span>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };


const MappingWithHighlight = ({ exercice }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {exercice.map((item, index) => (
        <React.Fragment key={index}>
          <span className={`highlight ${getWordCategoryColor(item.pos)}`}>
            <span className="invisible-text">{item.form}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

const MappingWithHighlightWithText = ({ exercice }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {exercice.map((item, index) => (
        <React.Fragment key={index}>
          <span className={`highlight ${getWordCategoryColor(item.pos)}`}>
            <span style={{color : 'black'}}>{item.form}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

const MappingWithTime = ({ exercice }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {exercice.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span style={{ marginRight: `${item.time * 10}px` }}>&nbsp;</span>}
          <span className={`highlight ${getWordCategoryColorByTime(item.time)}`}>
            <span style={{color : 'black'}}>{item.form}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};





export default Visu;
