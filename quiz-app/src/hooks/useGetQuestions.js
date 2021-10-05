import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useGetQuestions(videoID) {
  // this callback function of useEffect must be a synchronous function, to avoid race condition

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      // database works
      const db = getDatabase();
      const questionsRef = ref(db, `quiz/${videoID}/questions`);
      const questionsQuery = query(questionsRef, orderByKey());

      // fetching data from database

      try {
        setError(false);
        setLoading(true);
        // request from firebase database
        const snapshot = await get(questionsQuery);

        setLoading(false);

        if (snapshot.exists()) {
          setQuestions((prev) => {
            return [...prev, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchQuestions();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
