import React from 'react';
import './ActiveQuiz.scss'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => {

    return (
        <div className="ActiveQuiz">
            <p className="ActiveQuiz__question">
                <span>
                    <strong>{props.answerNumber}.</strong>&nbsp;
                    {`${props.question}?`}
                </span>
                <small>{props.answerNumber} from {props.quizLength}</small>
            </p>

            <AnswersList answers={props.answers}
                         onAnswerClickHandler={props.onAnswerClickHandler}
                         state={props.state}
            />
        </div>
    );
};

export default ActiveQuiz;
