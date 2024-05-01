import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setQuestions(data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));

    // Cleanup function
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setQuestions(questions.filter(question => question.id !== id));
      })
      .catch(error => console.error("Error deleting question:", error));
  };

  const handleUpdateCorrectIndex = (id, newIndex) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        return { ...question, correctIndex: newIndex };
      }
      return question;
    });

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex: newIndex })
    })
      .then(() => {
        setQuestions(updatedQuestions);
      })
      .catch(error => console.error("Error updating correct index:", error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onUpdateCorrectIndex={handleUpdateCorrectIndex}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
