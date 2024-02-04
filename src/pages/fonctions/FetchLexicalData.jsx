import { useState, useEffect } from "react";
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
      const lexicalWithIdExercise1 = allLexical.find(
        (item) => item.idExercises === exerciseData.idExercises
      );
      if (lexicalWithIdExercise1) {
        setLexical(lexicalWithIdExercise1);
      }
    }
  }, [allLexical, loadingLexical]);

  return {
    lexicalData,
  };
};

export default UseFetchLexicalData;
