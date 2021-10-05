import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useGetAnswers(videoID) {
  // this callback function of useEffect must be a synchronous function, to avoid race condition

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      // database works
      const db = getDatabase();
      const answersRef = ref(db, `answers/${videoID}/questions`);
      const answersQuery = query(answersRef, orderByKey());

      // fetching data from database

      try {
        setError(false);
        setLoading(true);
        // request from firebase database
        const snapshot = await get(answersQuery);

        setLoading(false);

        if (snapshot.exists()) {
          setAnswers((prev) => {
            return [...prev, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}
