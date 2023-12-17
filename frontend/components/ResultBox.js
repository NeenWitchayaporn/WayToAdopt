import React from "react";
import Card from "react-bootstrap/Card";
import "./ResultBox.css";

/* ResultBox component renders a card with question and answer text.
 * questionTitle : title of the question.
 * questionAnswer : answer of the question.
 */
const ResultBox = ({ questionTitle, questionAnswer }) => {
  return (
    // card component to display question and answer
    <Card className="result-box" style={{ borderColor: "transparent" }}>
      <Card.Body className="question-box">
        {/* display the question title */}
        <Card.Text className="question-text">{questionTitle}</Card.Text>
        {/* display the answer */}
        <Card.Body className="answer-box">
          <Card.Text className="answer-text">{questionAnswer}</Card.Text>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};
export default ResultBox;
