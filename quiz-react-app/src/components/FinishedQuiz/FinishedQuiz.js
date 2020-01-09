import React from 'react';
import './FinishedQuiz.scss'
import {Button} from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)
    return (
        <div className="FinishedQuiz">

            <ul>
                {props.quiz.map((que, ind) => {
                    const toggleMark = props.results[que.id] === 'error' ? 'er' : 'suc'

                    return (
                        <li key={ind}>
                            <strong>{ind + 1}.</strong>&nbsp;
                            <b className={toggleMark}>{que.question}</b>
                        </li>
                    )
                })}
            </ul>
            <div className="FinishedQuiz__wrapper">
                <small>Right {successCount} from {props.quiz.length}</small>
                <Button disabled={false}
                        onClick={props.onReTry}
                        cls="primary"
                        type="button">Repeat
                </Button>
                <Link to={`/`}>
                    <Button disabled={false}
                            onClick={props.onReTry}
                            cls="success"
                            type="button">Go to Tests List
                    </Button>
                </Link>

            </div>
        </div>
    );
};

export default FinishedQuiz;
