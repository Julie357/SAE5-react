import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectLexical,
  selectLoadingLexical,
} from "../../features/lexical/lexicalSelector";

const UseFetchLexicalData = (exerciseData) => {
  const allLexical = useSelector(selectLexical);
  const loadingLexical = useSelector(selectLoadingLexical);
  const [lexicalData, setLexical] = useState([]);

  useEffect(() => {
    if (exerciseData) {
      const lexicalWithIdExercise = allLexical.find(
        (item) => item.idLexical === exerciseData.idLexical
      );
      if (lexicalWithIdExercise) {
        setLexical(lexicalWithIdExercise);
      }
    }

  }, [allLexical, loadingLexical]);

  return {
    lexicalData,
  };
};

export default UseFetchLexicalData;
