import React from 'react';
import WordChart from '../composants/WordChart';

const Visu = () => {
  const exercice1 = [
    { "id": 1, "form": "Meine", "lemma": "mein", "pos": "PRON", "morphology": "PPOSAT", "features": { "Case": "Nom", "Gender": "Fem", "Number": "Sing", "Poss": "Yes" }, "head": 2, "dep_rel": "det:poss", "error": true ,"time": 1},
    { "id": 2, "form": "Motivation", "lemma": "Motivation", "pos": "NOUN", "morphology": "NN", "features": { "Case": "Nom", "Gender": "Fem", "Number": "Sing" }, "head": 7, "dep_rel": "nsubj:pass", "error": true,"time": 1.9 },
    { "id": 3, "form": "um", "lemma": "um", "pos": "ADP", "morphology": "APPR", "head": 5, "dep_rel": "case", "error": true ,"time": 0.53},
    { "id": 4, "form": "deutsche", "lemma": "deutsch", "pos": "ADJ", "morphology": "ADJA", "features": { "Case": "Acc", "Gender": "Fem", "Number": "Sing" }, "head": 5, "dep_rel": "amod", "error": false ,"time": 0.23},
    { "id": 5, "form": "Sprache", "lemma": "Sprache", "pos": "NOUN", "morphology": "NN", "features": { "Case": "Acc", "Gender": "Fem", "Number": "Sing" }, "head": 2, "dep_rel": "nmod", "error": false ,"time": 0.9},
    { "id": 6, "form": "zu", "lemma": "zu", "pos": "PART", "morphology": "NN", "features": { "Case": "Acc", "Gender": "Masc", "Number": "Plur" }, "head": 7, "dep_rel": "mark", "error": false,"time": 1.4},
    { "id": 7, "form": "lernen", "lemma": "lernen", "pos": "VERB", "morphology": "VVINF", "features": { "VerbForm": "Inf" }, "head": 0, "dep_rel": "root", "error": false ,"time": 0.6},
    { "id": 8, "form": "ist", "lemma": "sein", "pos": "AUX", "morphology": "ADJD", "head": 7, "dep_rel": "aux:pass", "features": { "SpaceAfter": "No" }, "error": true,"time": 4.5 },
    { "id": 9, "form": ",", "lemma": ",", "pos": "PUNCT", "morphology": "$,", "head": 12, "dep_rel": "punct", "error": false ,"time": 3.1},
    { "id": 10, "form": "dass", "lemma": "dass", "pos": "SCONJ", "morphology": "KOUS", "head": 12, "dep_rel": "mark", "error": true ,"time": 10},
    { "id": 11, "form": "ich", "lemma": "ich", "pos": "PRON", "morphology": "PPER", "features": { "Case": "Nom", "Number": "Sing", "Person": "1", "PronType": "Prs" }, "head": 12, "dep_rel": "nsubj", "error": false,"time": 1.78 },
    { "id": 12, "form": "habe", "lemma": "haben", "pos": "VERB", "morphology": "VAFIN", "features": { "Mood": "Sub", "Number": "Sing", "Person": "3", "Tense": "Pres", "VerbForm": "Fin" }, "head": 7, "dep_rel": "ccomp", "error": false,"time": 2.07 },
    { "id": 13, "form": "ehemaligen", "lemma": "ehemalig", "pos": "ADJ", "morphology": "ADJA", "features": { "Case": "Dat", "Gender": "Neut", "Number": "Plur" }, "head": 14, "dep_rel": "amod", "error": false ,"time": 0.35},
    { "id": 14, "form": "Vorfahren", "lemma": "Vorfahr|Vorfahren", "pos": "NOUN", "morphology": "NN", "features": { "Case": "Dat", "Gender": "Neut", "Number": "Plur" }, "head": 12, "dep_rel": "obj", "error": false,"time": 0.16 },
    { "id": 15, "form": "in", "lemma": "in", "pos": "ADP", "morphology": "APPR", "head": 16, "dep_rel": "case", "error": true ,"time": 0.50},
    { "id": 16, "form": "Deutschland", "lemma": "Deutschland", "pos": "PROPN", "morphology": "NE", "features": { "Case": "Dat", "Gender": "Neut", "Number": "Sing", "SpaceAfter": "No" }, "head": 14, "dep_rel": "nmod", "error": false ,"time": 0.20},
    { "id": 17, "form": ".", "lemma": ".", "pos": "PUNCT", "morphology": "$.", "head": 7, "dep_rel": "punct", "error": true ,"time": 1.64}
  ];
  const text = exercice1.map(item => item.form).join(' ');

  return (
    <div>
      <Mapping text={text} exercice={exercice1} />
      <Legend />
      <WordChart words={exercice1} />

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



export default Visu;
