import React from 'react';

const ClasseInfoamtions = ({ match }) => {
  const { classeId } = match.params;

  // Supposez que vous ayez des données spécifiques à la classe basées sur classeId
  const classDetails = {
    // Les détails de la classe, par exemple :
    id: classeId,
    // Autres détails...
  };

  return (
    <div>
      <h2>Page de détails de la classe {classDetails.id}</h2>
      {/* Affichez les détails de la classe ici */}
      <p>ID: {classDetails.id}</p>
      {/* Autres détails... */}
    </div>
  );
};

export default ClasseInfoamtions;
