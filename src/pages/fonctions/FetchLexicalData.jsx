import { useSelector } from "react-redux";
import {
  selectLexical,
  selectLoadingLexical,
} from "../../features/lexical/lexicalSelector";
import { selectExercices } from "../../features/exercices/exerciceSelector";

const FetchLexicalData = (idText) => {
  console.log(idText)
  const allExercises = useSelector(selectExercices);
  const exerciseData = allExercises.find((exercise) => exercise.idExercises == idText);
  console.log('data:'+exerciseData);
  const lexical = exerciseData.idLexical;
  console.log(exerciseData.idLexical)
  const loadingLexical = useSelector(selectLoadingLexical);

  return {
    lexical,
    loadingLexical,
  };
};

export default FetchLexicalData;
