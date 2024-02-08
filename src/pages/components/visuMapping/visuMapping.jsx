import React from 'react';
import './MappingWithHighlight.css';

const Visu = ({lexicalUnit}) => {
  
  const text = lexicalUnit.map(item => item.form).join(' ');

  return (
    <div>
      <Mapping text={text} exercice={lexicalUnit} />
      <MappingWithHighlight exercice={lexicalUnit} />
      <Legend />
      <MappingWithHighlightWithText exercice={lexicalUnit} />
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
