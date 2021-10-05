import { getDatabase, ref, set } from "@firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useGetQuestions from "../../hooks/useGetQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case "answers":
      const answers = _.cloneDeep(state);
      answers[action.questionID].options[action.optionIndex].checked =
        action.value;
      return answers;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();

  const { loading, error, questions } = useGetQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const history = useHistory();
  const { location } = history;
  const { state } = location;

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answers",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  // navigate to the next question in the database
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  // navigate to the previous question in the database
  function previousQuestion() {
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  // submit results into database
  async function saveResult() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    try {
      await set(resultRef, {
        [id]: qna,
      });

      // I am passing data from quiz page to result page via state, so that, again I dont have to pull data from database

      history.push({
        pathname: `/result/${id}`,
        state: {
          qna,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <h4>Loading...</h4>}
      {error && <h4>There is an Error!</h4>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>

          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            previous={previousQuestion}
            progress={percentage}
            submit={saveResult}
          />
          <MiniPlayer id={id} title={state.title} />
        </>
      )}
    </>
  );
}
