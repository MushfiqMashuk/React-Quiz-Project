import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import useGetAnswers from "../../hooks/useGetAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;

  const { loading, error, answers } = useGetAnswers(id);

  function calculateResult() {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctAnswers = [],
        checkedAnswers = [];

      question.options.forEach((option, index2) => {
        if (option.correct) {
          correctAnswers.push(index2);
        }

        if (qna[index1].options[index2].checked) {
          checkedAnswers.push(index2);
          option.checked = true;
        }
        
      });

      if (_.isEqual(correctAnswers, checkedAnswers)) {
        score = score + 5; 
      }

    });

    return score;

  }

  const userScore = calculateResult();

  return (
    <>
      {loading && <h4>Loading...</h4>}
      {error && <h4>There is an Error!</h4>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis score={userScore} noq={answers.length} answers={answers}/>
        </>
      )}
    </>
  );
}
