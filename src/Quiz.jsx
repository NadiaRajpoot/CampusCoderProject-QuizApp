import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../src/constants.js";

function Quiz(props) {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [result, setresult] = useState(false);
  const [score, setScore] = useState(0);
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        {
          props.mode === "light"
            ? e.target.classList.add("correct")
            : e.target.classList.add("correct-dark");
        }
        setLock(true);
        setScore((prev) => prev + 2);
      } else {
        {
          props.mode === "light"
            ? e.target.classList.add("wrong")
            : e.target.classList.add("wrong-dark");
        }
        setLock(true);
        {
          props.mode === "light"
            ? option_array[question.ans - 1].current.classList.add("correct")
            : option_array[question.ans - 1].current.classList.add(
                "correct-dark"
              );
        }
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setresult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        {
          props.mode === "light"
            ? option.current.classList.remove("wrong")
            : option.current.classList.remove("wrong-dark");
        }
        {
          props.mode === "light"
            ? option.current.classList.remove("correct")
            : option.current.classList.remove("correct-dark");
        }

        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setresult(false);
  };

  return (
    <div className= 'app' data-theme={props.mode}>
    <div className="container" data-theme={props.mode}>
      <h1>
        Quiz App{" "}
        <span>
          {" "}
          <i onClick={props.toggleMode} class="fa-solid fa-moon"></i>
        </span>
      </h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} question
          </div>
        </>
      )}
      {result ? (
        <>
          <div className="result">
            <h1>Result</h1>
            <p>
              Total Question : <span>{data.length}</span>
            </p>
            <p>
              Total Score : <span>{score}</span>
            </p>
            <p>
              Correct Answer : <span>{score / 2}</span>
            </p>
            <p>
              Wrong Answer: <span>{data.length - score / 2}</span>
            </p>
          </div>
          <button onClick={reset}>try again</button>
        </>
      ) : (
        <></>
      )}
    </div>
    </div>
  );
}

export default Quiz;
