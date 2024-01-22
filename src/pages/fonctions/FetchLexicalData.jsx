import { useSelector } from "react-redux";
import {
  selectLexical,
  selectLoadingLexical,
} from "../../features/lexical/lexicalSelector";

const FetchLexicalData = (idText) => {
  const allLexical = useSelector(selectLexical);
  const lexical = allLexical.find((lexical) => lexical.idExercises == idText);
  const loadingLexical = useSelector(selectLoadingLexical);

  return {
    lexical,
    loadingLexical,
  };
};

export default FetchLexicalData;
