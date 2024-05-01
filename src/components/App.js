import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Function to add a new question to the list
  const addQuestionToList = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setPage("List"); // Switch back to the question list view after adding the question
  };
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmit={addQuestionToList} /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;
